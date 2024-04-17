import axios from 'axios';

class ApiHandler {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://quizz-musical-backend.airdev.be/api/',
    });
  }

  fetchCategories = async () => {
    const res = await this.axiosInstance('categories');

    const response = this.checkResponse(res);

    // Hardcode disable for category "Sortie d'album" id 3 set is_active to 0
    response.data[2].is_active = 0;

    if (!response) return null;

    return this.checkResponse(res).data;
  };

  fetchQuestionsForCategory = async (categoryId) => {
    const res = await this.axiosInstance(`categories/${categoryId}`);

    const response = this.checkResponse(res);

    if (!response) return null;

    return this.checkResponse(res).data;
  };

  fetchOneQuestionForCategory = async (categoryId, questionID) => {
    const res = await this.axiosInstance(
      `categories/${categoryId}?id=${questionID}`
    );

    const response = this.checkResponse(res);

    if (!response) return null;

    return this.checkResponse(res).data;
  };

  getIdCategoriesActivated = async () => {
    const res = await this.axiosInstance('categories?is_active=1').catch(
      (e) => {
        console.log('error: ', e);
      }
    );

    const response = this.checkResponse(res);

    if (!response) return null;

    return this.checkResponse(res).data.map((category) => category.id);
  };

  checkResponse = (res) => {
    if (res) return res;
    else return null;
  };
}

export default ApiHandler;
