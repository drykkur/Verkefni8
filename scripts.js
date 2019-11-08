const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  

  function init(_form, _items) {
    items = _items;
    let tjekkbox = items.getElementsByClassName('item__checkbox');
    let textabox = items.getElementsByTagName('span');
    let takkabox = items.getElementsByTagName('button');
    _form.addEventListener('submit', formHandler);
    //items.addEventListener('CheckboxStateChange', finish);
    console.log(tjekkbox);
    console.log(textabox);
    for (const x of tjekkbox) {
      x.addEventListener('change', finish);
    }
    for (const x of textabox) {
      x.addEventListener('click', edit); 
    }
    for (const x of takkabox) {
      x.addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    let inputtexti = document.querySelector(".form__input").value; 
    if (inputtexti != '' && inputtexti.trim().length != '')
    add (inputtexti); 
    document.querySelector(".form__input").value ='';
    console.log('halló heimur');
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    console.log('finish');
    event.target.parentNode.classList.toggle('item--done');
    /*for (const j of items.children) {
      if (j.children[0].checked == true) {
        j.setAttribute('class', 'item item--done');
     } else {
        j.setAttribute('class', 'item');
     }     
    }*/
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    console.log(event.target);
    var sp1 = el('input', 'item__edit', 'null');
    var drasl = event.target.textContent;
    console.log(drasl[0].textContent);
    sp1.setAttribute('value', drasl);//drasl[0].textContent);
    var sp2 = event.target;//document.querySelector('.item__text');
    items.addEventListener('keydown', commit);
    event.target.parentNode.replaceChild(sp1, sp2);
    sp1.focus();
    
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    var sp1 = document.querySelector('.item__edit');
    var sp2 = el('span', 'item__text', 'null');
    let sp2texti = document.createTextNode(document.querySelector('.item__edit').value);
    sp2.appendChild(sp2texti);
    if (e.keyCode == ENTER_KEYCODE) {
      console.log('enter');
      event.target.parentNode.replaceChild(sp2, sp1);
      sp2.addEventListener('click', edit);
      sp1.blur();
    }
    
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    console.log('gerist');
    const listi = el('li', 'item', 'null');
    const tjekk = el('input', 'item__checkbox', 'null');
    const spaan = el('span', 'item__text', 'null');
    const takki = el('button', 'item__button', 'null');
    const buttonText = document.createTextNode('Eyða');
    const texti = document.createTextNode(value);
    tjekk.setAttribute('type', 'checkbox');
    takki.appendChild(buttonText);
    spaan.appendChild(texti);
    listi.appendChild(tjekk);
    listi.appendChild(spaan);
    listi.appendChild(takki);
    items.appendChild(listi);
    spaan.addEventListener('click', edit); 
    takki.addEventListener('click', deleteItem);
    tjekk.addEventListener('change', finish);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    console.log('deleted');
    console.log(event.target);
    let del1 = event.target.parentNode;
    del1.parentNode.removeChild(del1);
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const value = document.createElement(type);
    value.setAttribute('class', className);
    return value;
    
  }

  return {
    init: init
  }
})();
