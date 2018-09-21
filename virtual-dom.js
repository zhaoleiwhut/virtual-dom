function Element({ tagName, props, children }) {
    if (!(this instanceof Element)) {
        return new Element({ tagName, props, children });
    }
    this.tagName = tagName;
    this.props = props || {};
    this.children = children || [];
}

Element.prototype.render = function() {
    const el = document.createElement(this.tagName);
    const props = this.props;

    for (let propName in props) {
        if (props.hasOwnProperty(propName)) {
            let propValue = props[propName];
            el.setAttribute(propName, propValue)
        }
    }

    this.children.forEach(function(child) {
        let childEl = null;
        if (child instanceof Element) {
            childEl = child.render();
        } else {
            childEl = document.createTextNode(child);
        }
        el.appendChild(childEl);
    });
    return el;
};

function changed(elem1, elem2) {
    return (typeof elem1 !== typeof elem2) ||
        (typeof elem1 === 'string' && elem1 !== elem2) ||
        (elem1.type !== elem2.type);
}

function updateElement($root, newElem, oldElem, index = 0) {
    if (!oldElem) {
        $root.appendChild(newElem.render());
    } else if (!newElem) {
        $root.removeChild($root.childNodes[index]);
    } else if (changed(newElem, oldElem)) {
        if (typeof newElem === 'string') {
            $root.childNodes[index].textContent = newElem;
        } else {
            $root.replaceChild(newElem.render(), $root.childNodes[index]);
        }
    } else if (newElem.tagName) {
        let newLen = newElem.children.length;
        let oldLen = oldElem.children.length;
        for (let i = 0; i < newLen || i < oldLen; i++) {
            updateElement($root.childNodes[index], newElem.children[i], oldElem.children[i], i);
        }
    }
}
