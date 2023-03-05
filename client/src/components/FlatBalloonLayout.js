import $ from 'jquery';
import ReactDOMServer from 'react-dom/server';
import React from "react";
import CarouselFlat from "./CarouselFlat";
import FlatCard from "./FlatCard";

export function FlatBalloonLayout (yMaps) {
    const template = ReactDOMServer.renderToStaticMarkup(
        <div className="balloon rounded shadow-lg">
            <div className="hide-container">
                <div className="p-1" data-bs-theme="dark">
                    <button type="button" className="btn-close bg-light rounded-circle p-2" aria-label="Close"></button>
                </div>
            </div>
            $[properties.balloonContentBody]
            <div className="arrow">
                <div className="inner-arrow"/>
            </div>
        </div>
    );

    const overrides = {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
            this.constructor.superclass.build.call(this);

            this._$element = $('.balloon', this.getParentElement());

            this.applyElementOffset();

            this._$element.find('.btn-close')
                .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function () {
            this._$element.find('.btn-close')
                .off('click');

            this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function () {
            FlatBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

            if(!this._isElement(this._$element)) {
                return;
            }

            this.applyElementOffset();

            this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function () {
            this._$element.css({
                left: -(this._$element[0].offsetWidth / 2),
                top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
            });
        },

        /**
         * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onCloseClick
         */
        onCloseClick: function (e) {
            e.preventDefault();

            this.events.fire('userclose');
        },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
            if(!this._isElement(this._$element)) {
                return FlatBalloonLayout.superclass.getShape.call(this);
            }

            var position = this._$element.position();

            return new yMaps.shape.Rectangle(new yMaps.geometry.pixel.Rectangle([
                [position.left, position.top], [
                    position.left + this._$element[0].offsetWidth,
                    position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                ]
            ]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        _isElement: function (element) {
            return element && element[0] && element.find('.arrow')[0];
        }
    }

    return yMaps.templateLayoutFactory.createClass(template, overrides);
}

export function FlatBalloonContent (flat) {
    return ReactDOMServer.renderToStaticMarkup(
        <FlatCard flat={flat} prefix={'Balloon'}/>
        //<CarouselFlat flat={flat} prefix={'Balloon'}/>
    );
}