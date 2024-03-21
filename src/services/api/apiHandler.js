import axios from 'axios';
class ApiHandler {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://quizz-musical-backend.airdev.be/api/',
    });
  }

  fetchCategories = async () => {
    const res = await this.axiosInstance('categories');

    return res.data;
  };

  fetchQuestionsForCategory = async (categoryId) => {
    const res = await this.axiosInstance(`categories/${categoryId}`);

    return res.data;
  };

  fetchOneQuestionForCategory = async (categoryId, questionID) => {
    const res = await this.axiosInstance(
      `categories/${categoryId}?id=${questionID}`
    );

    return res.data;
  };

  getIdCategoriesActivated = async () => {
    const res = await this.axiosInstance('categories?is_active=1');
    const id = res.data.map((category) => category.id);

    return id;
  };
}

export default ApiHandler;
