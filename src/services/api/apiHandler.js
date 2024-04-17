import axios from 'axios';

class ApiHandler {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://quizz-musical-backend.airdev.be/api/',
    });
  }

  fetchCategories = async () => {
    const res = await this.axiosInstance('categories');

    return this.checkResponse(res).data;
  };

  fetchQuestionsForCategory = async (categoryId) => {
    const res = await this.axiosInstance(`categories/${categoryId}`);

    return this.checkResponse(res).data;
  };

  fetchOneQuestionForCategory = async (categoryId, questionID) => {
    const res = await this.axiosInstance(
      `categories/${categoryId}?id=${questionID}`
    );

    return this.checkResponse(res).data;
  };

  getIdCategoriesActivated = async () => {
    const res = await this.axiosInstance('categories?is_active=1').catch(e => {
      console.log("error: ", e)
    });

    return this.checkResponse(res).data.map((category) => category.id);

  };

  checkResponse = (res) => {
    if(res)
      return res;
    else
      return null;
  }
}

export default ApiHandler;
