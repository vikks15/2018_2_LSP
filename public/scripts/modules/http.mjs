const noop = () => null;

/**
 * Модуль для работы с HTTP-запросами
 * @module Http
 */
export default class Http {
	/**
     * Приватный метод отправки запроса (является базовым)
     * @param {function} callback - функция-коллбек
     * @param {string} method - метод запроса
     * @param {string} path - адрес запроса
     * @param {Object} body - тело запроса
     */
	static _request(callback = noop, method = 'GET', path = '/', body = {}) {
		const xhr = new XMLHttpRequest();
		xhr.open(method, path, true);
		xhr.withCredentials = true;
    
		if (body && !(body instanceof FormData)) {
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		}
    
		xhr.onreadystatechange = () => {
			if (xhr.readyState !== xhr.DONE) {
				return;
			}
			let response = '';
			if (xhr.responseText !== '') {
				try {
					response = JSON.parse(xhr.responseText);
				} catch (e) {
					response = 'Cannot parse response text';
				}
			}
			if (+xhr.status !== 200 && +xhr.status !== 201) {
				callback(xhr, response);
			} else {
				callback(null, response);
			}
		};

		if (body instanceof FormData) {
			xhr.send(body);
		} else if (body) {			
			xhr.send(JSON.stringify(body));
		} else {
			xhr.send();
		}
	}

	/**
     * Функция Get-запроса
     * @param {function} callback - коллбек-функция
     * @param {string} path - адрес запроса
     * @param {Object} body - тело запроса
     */
	static Get(callback, path, body) {
		this._request(callback, 'GET', path, body);
	}
    
	/**
     * Функция Post-запроса
     * @param {function} callback - коллбек-функция
     * @param {string} path - адрес запроса
     * @param {Object} body - тело запроса
     */
	static Post(callback, path, body) {
		this._request(callback, 'POST', path, body);
	}

	/**
     * Функция Delete-запроса
     * @param {function} callback - коллбек-функция
     * @param {string} path - адрес запроса
     * @param {Object} body - тело запроса
     */
	static Delete(callback, path, body) {
		this._request(callback, 'DELETE', path, body);
	}

	/**
     * Функция Delete-запроса
     * @param {function} callback - коллбек-функция
     * @param {string} path - адрес запроса
     * @param {Object} body - тело запроса
     */
	static Put(callback, path, body) {
		this._request(callback, 'PUT', path, body);
	}
}