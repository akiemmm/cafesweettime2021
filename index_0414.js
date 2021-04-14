const config = {
	head:[
			{element: "title", contents:"CAFE Sweet Time"},
			{element:"meta", contents:"", options:{name:"viewport", content:"width=device-width,initial-scale=1"}},
			{element:"meta", contents:"", options:{charset:"UTF-8"}}]
}
//引数には親、タグ、テキスト、オプション（属性など）を入れます。
const createChildTag = (parent, tag, text, options) => {
	//まずタグ(element)をつくります。
	const element = document.createElement(tag);
	element.innerText = text;
	//もしオプションがあった場合のメソッドを作ります。
	//elementと同じ場所に入れるため、mapメソッドを使用し、keyを代入し入れるようにします。
	if(options) Object.keys(options).map(key => element[key] = options[key]);
	//親の中にelementをいれるメソッドを作ります。
	if(parent)parent.appendChild(element);
	// タグを返します。
	return element;
}
//配列のみを繰り返す場合
const renderLoopArrayParts = (parent, children) => {
	children.map(child=>createChildTag(parent,child.children.element,child.children.contents,child.children?.options))
}


//さらに配列を繰り返す
/*const renderLoopChildernParts = (parent, tag, text, options, children) => {
	//
	let loopPart = createChildTag(parent,tag,text,options);
	element.innerText = text;
	//もしオプションがあった場合のメソッドを作ります。
	children.map(child=>createChildTag(loopPart,child.children.element,
		child.children.contents,child.children?.options))
}
*/
window.addEventListener('DOMContentLoaded', () => {
	config.head.map(child => createChildTag(document.head, child.element, child.contents, child?.options));
//4/14、ここまでひらめくのに20分。でも実は1時間は悩んだ。やった！進んだ。

});

