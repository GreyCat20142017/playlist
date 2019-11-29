import React, {useState, useRef, useEffect} from 'react';
import {KEYCODES} from '../../constants';

const LinkDrop = ({link, css, clickHandler}) => (
    <a className={css.linkCss}
       href={link.href} onClick={clickHandler}
       key={link.key}>
        {link.text}
    </a>
);

const ButtonDrop = ({link, css, clickHandler}) => {
    return (
        <button className={css.linkCss}
                type='button' onClick={() => clickHandler(link.key)}
                key={link.key}>
            {link.text}
        </button>
    );
};

/**
 * для передачи в props DropDown нужно подготовить массив объектов вида
 * {key: 'key', link: 'link', text: 'text'}
 */
const DropDown = ({
                      data = [], togglerText = 'перейти...', ariaInfo = 'dropdown', dropdownSet = [],
                      callback = null, routerLink = false,
                      css = {
                          togglerCss: 'btn dropdown-toggle btn-block',
                          linkCss: 'dropdown-item w-100'
                      }
                  }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleContainer = useRef(null);
    let timeOutId = null;
    const dropOpenedClass = isOpen ? ' show ' : '';
    const links = Array.isArray(data) ? data : [];

    useEffect(() => {
        document.addEventListener('click', onClickOutsideHandler);
        document.addEventListener('keydown', onKeyPress);
        return () => {
            document.removeEventListener('click', onClickOutsideHandler);
            document.removeEventListener('keydown', onKeyPress);
        };
    });

    const onClickHandler = () => setIsOpen(!isOpen);

    const onButtonClickHandler = (key) => {
        if (callback) {
            setIsOpen(false);
            callback(key);
        }
    };

    const onClickOutsideHandler = (evt) => {
        if (isOpen && toggleContainer.current.contains(evt.target)) {
            setIsOpen(false);
        }
    };

    const onBlurHandler = () => {
        timeOutId = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    const onKeyPress = (evt) => {
        if (evt.keyCode === KEYCODES.ESC) {
            evt.preventDefault();
            setIsOpen(false);
        }
    };

    const onFocusHandler = () => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
    };

    return (
        <div className='dropdown mt-1 p-1' ref={toggleContainer} onBlur={onBlurHandler}
             onFocus={onFocusHandler}>
            <button className={css.togglerCss} type='button'
                    id={ariaInfo}
                    data-toggle='dropdown' aria-haspopup='true' aria-expanded='false' onClick={onClickHandler}>
                {togglerText}
            </button>
            <div className={'dropdown-menu w-100' + dropOpenedClass} aria-labelledby={ariaInfo}>
                {links.map((link, ind) =>
                    (callback ?
                        <ButtonDrop key={ind} link={link} css={css}
                                    clickHandler={onButtonClickHandler}/> :
                        <LinkDrop key={ind} link={link} css={css}/>)
                )}
            </div>
        </div>
    );
};

export default DropDown;
