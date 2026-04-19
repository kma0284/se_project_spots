export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  _request(endpoint, options = {}) {
    const finalOptions = {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    };

    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, finalOptions).then((res) => this._handleResponse(res));
  }

  // -------------------------
  // USER

  getUserInfo() {
    return this._request("/users/me");
  }

  updateUserInfo(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateAvatar(data) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  // -------------------------
  // CARDS

  getCards() {
    return this._request("/cards");
  }

  addCard(data) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "PUT",
    });
  }

  unlikeCard(id) {
    return this._request(`/cards/${id}/likes`, {
      method: "DELETE",
    });
  }
}
