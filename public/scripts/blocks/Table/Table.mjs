import Block from '../Block/Block.mjs';
import Bus from '../../modules/eventBus.mjs';
import './Table.scss';

export default class Table extends Block {
	/**
     * Создание новой таблицы
     * @param head заголовки столбцов таблицы
     * @param page номер страницы
     * @param callback функция-коллбек получения i-ой страницы (аргумент - номер страницы)
     */
	constructor(fields = {}, tableClass = [], components = [], onclick) {
		super('table', tableClass);
		this._fields = fields;
		this._onclick = onclick;

		// thead
		const trhead = new Block('tr', ['leaders-table__header']);
		for (let header in this._fields) {
			const th = new Block('th');
			th.setText(header);
			trhead.append(th);
		}
		this.append(trhead);

		// tfoot
		const trfoot = new Block('tr', ['leaders-table__footer']);
		const thfoot = new Block('th', [], {'colspan': Object.keys(this._fields).length});
		components.forEach(component => {	// добавление компонентов
			thfoot.append(component);
		});

		trfoot.append(thfoot);
		this.append(trfoot);

		// tbody
		this._tbody = new Block('tbody');
		this.append(this._tbody);

		Bus.on('paginator-update', this.update.bind(this));
	}

	update(data = []) {
		this._tbody.clear();
		data.forEach(item => {
			const tr = document.createElement('tr');
			tr.classList.add('leaders-table__row');
			if (item.me) {  // если запись принадлежит данному пользователю, выделяем поле
				tr.classList.add('leaders-table__row_me');
			}            
			for (let header in this._fields) {
				const th = document.createElement('th');
				th.classList.add('leaders-table__cell');
				th.textContent = item[this._fields[header]];
				tr.appendChild(th);
			}
			tr.addEventListener('click', this._onclick);
			this._tbody.getElement().appendChild(tr);
		});
	}
}