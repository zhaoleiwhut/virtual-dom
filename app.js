const elem = Element({
    tagName: 'ul',
    props: { className: 'list' },
    children: [
        Element({ tagName: 'li', children: ['item1'] }),
        Element({ tagName: 'li', children: ['item2'] }),
    ],
});

const newElem = Element({
    tagName: 'ul',
    props: { className: 'list' },
    children: [
        Element({ tagName: 'li', children: ['item1'] }),
        Element({ tagName: 'li', children: ['hahah'] }),
    ],
});

console.log(elem);

var $root = document.querySelector('#root');
updateElement($root, elem);
document.querySelector('button').addEventListener('click', () => {
    updateElement($root, newElem, elem);
});
