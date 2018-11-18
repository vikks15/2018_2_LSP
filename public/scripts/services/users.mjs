import Http from '../modules/http.mjs';

const path = 'https://jackal.online/api'; 

/**
 * Сервис для работы с пользователями
 * @module Users
 */
export default class Users {
	// static constructor() {
	// 	this.user = null;
	// 	this.id = null;
	// 	this.users = {};
	// }

	/**
	 * Авторизация пользователя
	 * @param {Function} callback функция-коллбек
	 * @param data 
	 */
	static auth(callback, data = {}) {
		Http.Post(callback, path + '/session', data);		
	}

	// static logout(callback) {
	// 	Http.Get(callback, path + '/logout');
	// 	Http.Delete(callback, '/session');
	// }

	/**
	 * Регистрация пользователя
	 * @param {Function} callback функция-коллбек
	 * @param data 
	 */
	static register(callback, data = {}) {
		Http.Post(callback, path + '/users', data);
	}

	/**
	 * Проверка, является-ли пользователь авторизованным
	 */
	static isLoggedIn() {
		return !!this.user;
	}

	/**
	 * Получение данных профиля пользователя
	 * @param {Function} callback функция-коллбек
	 */
	static profile(callback) {
		if (this.isLoggedIn()) {
			return callback(null, this.user);
		} 

		const call = function(err, user) {
			if (err) {
				return callback(err, user);
			}
			this.user = user;
			return callback(null, user);
		}.bind(this);

		let payload = jwt_decode(this._cookieParser('header.payload'))['id'];
		// if (payload) {
		// 	payload = jwt_decode(payload)['id'];
		// }
		if (payload) {
			Http.Get(call, path + '/users/' + payload + '?fields=username,email,firstname,lastname,rating,avatar,totalgames');
		} 
		// else {
		// 	router.open('/profile');
		// }
	}

	/**
	 * Получение данных таблицы лидеров
	 * @param {Function} callback функция-коллбек
	 * @param {Object} data 
	 */
	static leaders(callback, data = {}) {
		const query = path + '/users?page=' + data.page + '&fields=username,rating,totalgames&orderby=rating';
		const call = function(err, users) {
			if (err) {
				return callback(err, users);
			}
			this.users = users;

			if (this.isLoggedIn()) {
				this.users = users.map(user => {
					if (this.user.email === user.email) {
						user.me = true;
					}
					return user;
				});
			}
			return callback(null, users);
		}.bind(this);
		Http.Get(call, query, data);
	}

	/**
	 * Парсинг кук
	 * @param {string} name название поля
	 */
	static _cookieParser(name) {
		const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
}
