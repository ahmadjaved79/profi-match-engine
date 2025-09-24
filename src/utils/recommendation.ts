import { Student, Internship, Recommendation } from '@/types';

// TF-IDF and Cosine Similarity implementation
export class RecommendationEngine {
  private static calculateTFIDF(documents: string[]): number[][] {
    const vocabulary = new Set<string>();
    const processedDocs = documents.map(doc => {
      const terms = doc.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(term => term.length > 2);
      terms.forEach(term => vocabulary.add(term));
      return terms;
    });

    const vocabArray = Array.from(vocabulary);
    const tfidfMatrix: number[][] = [];

    processedDocs.forEach(terms => {
      const termFreq: { [key: string]: number } = {};
      terms.forEach(term => {
        termFreq[term] = (termFreq[term] || 0) + 1;
      });

      const tfidfVector: number[] = [];
      vocabArray.forEach(term => {
        const tf = (termFreq[term] || 0) / terms.length;
        const df = processedDocs.filter(doc => doc.includes(term)).length;
        const idf = Math.log(documents.length / (df || 1));
        tfidfVector.push(tf * idf);
      });

      tfidfMatrix.push(tfidfVector);
    });

    return tfidfMatrix;
  }

  private static cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] ** 2;
      normB += vectorB[i] ** 2;
    }

    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  private static ruleBasedFilter(student: Student, internships: Internship[]): Internship[] {
    return internships.filter(internship => {
      // Education filter
      const educationMatch = internship.eligibility.some(req => 
        student.education.toLowerCase().includes(req.toLowerCase()) ||
        req.toLowerCase().includes(student.education.toLowerCase())
      );

      // Location preference filter
      const locationMatch = student.locationPreference.toLowerCase() === 'any' ||
        internship.location.toLowerCase().includes(student.locationPreference.toLowerCase()) ||
        student.locationPreference.toLowerCase().includes(internship.location.toLowerCase());

      return educationMatch && locationMatch;
    });
  }

  public static generateRecommendations(student: Student, internships: Internship[]): Recommendation[] {
    // Step 1: Rule-based filtering
    const filteredInternships = this.ruleBasedFilter(student, internships);
    
    if (filteredInternships.length === 0) {
      return [];
    }

    // Step 2: Prepare documents for TF-IDF
    const studentProfile = `${student.skills.join(' ')} ${student.interests.join(' ')}`;
    const documents = [
      studentProfile,
      ...filteredInternships.map(internship => 
        `${internship.title} ${internship.description} ${internship.skills.join(' ')}`
      )
    ];

    // Step 3: Calculate TF-IDF matrix
    const tfidfMatrix = this.calculateTFIDF(documents);
    const studentVector = tfidfMatrix[0];

    // Step 4: Calculate similarities and create recommendations
    const recommendations: Recommendation[] = [];

    filteredInternships.forEach((internship, index) => {
      const internshipVector = tfidfMatrix[index + 1];
      const similarity = this.cosineSimilarity(studentVector, internshipVector);

      // Calculate matched skills
      const matchedSkills = student.skills.filter(skill =>
        internship.skills.some(reqSkill => 
          skill.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );

      // Generate reasons
      const reasons: string[] = [];
      
      if (matchedSkills.length > 0) {
        reasons.push(`${matchedSkills.length} matching skills: ${matchedSkills.join(', ')}`);
      }

      const matchedInterests = student.interests.filter(interest =>
        internship.description.toLowerCase().includes(interest.toLowerCase()) ||
        internship.title.toLowerCase().includes(interest.toLowerCase())
      );

      if (matchedInterests.length > 0) {
        reasons.push(`Aligns with your interests: ${matchedInterests.join(', ')}`);
      }

      if (internship.location.toLowerCase().includes(student.locationPreference.toLowerCase())) {
        reasons.push(`Located in your preferred area: ${internship.location}`);
      }

      reasons.push(`${Math.round(similarity * 100)}% profile compatibility`);

      recommendations.push({
        internship,
        score: similarity,
        reasons,
        matchedSkills
      });
    });

    // Step 5: Sort by similarity score and return top 5
    return recommendations
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }
}