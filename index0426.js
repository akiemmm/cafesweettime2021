const config = {
	head:[
			{element: "title", contents:"CAFE SWEETTIME"},
			//charaset作れない問題。4/16。
			{element:"meta", contents:"", options:{charset:"UTF-8"}},
			{element:"meta", contents:"", options:{name:"viewport", content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"}},

			{element:"link", contents:"", options:{rel:"icon", href:"https://akiemunakata.net/cafesweettime/favicon.ico"}},
			{element:"link", contents:"", options:{rel:"apple-touch-icon", href:"https://akiemunakata.net/cafesweettime/apple-touch-icon.png"}},
			{element:"link", contents:"", options:{rel:"stylesheet", href:"https://akiemunakata.net/cafesweettime/jquery.bxslider.css"}},
			{element:"link", contents:"", options:{rel:"apple-touch-icon", href:"https://akiemunakata.net/cafesweettime/apple-touch-icon.png"}},
			{element:"link", contents:"", options:{rel:"apple-touch-icon", href:"https://akiemunakata.net/cafesweettime/meanmenu.css"}},
			{element:"script", contents:"", options:{type:"text/javascript", charset:"UTF-8", src:"https://maps.googleapis.com/maps-api-v3/api/js/44/10/intl/ja_ALL/common.js"}},
		//{element:"script", contents:"", options:{src:css.js}}
	],
	body:[
		{element: "header", contents:""},
		{element: "nav", contents:"", options:{id:"nav"}},
		{element:"main", contents:""},
		{element:"footer", contents:""}
	],
	menus: ["HOME","NEWS","CONCEPT","MENU","ACCESS","CONTACT"],
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
//ul/liを実装したい。
//ul自体にタグを実装するには？
//それともrenderloopを3階層分作ったほうが効率的なのか
const createListTag = (parent,  tag, text, olul, options) => {
	const ul = document.createElement('ul'); 
	const ol = document.createElement('ol');
	(olul === "ul") ? ul : ol;
	const li = document.createElement("li");
	//その後タグ(element)をつくります。
	if(tag)element = document.createElement(tag);
	element.innerText = text;
	//もしオプションがあった場合のメソッドを作ります。
	//elementと同じ場所に入れるため、mapメソッドを使用し、keyを代入し入れるようにします。
	if(options) Object.keys(options).map(key => element[key] = options[key]);
	//親の中にolulをいれるメソッドを作ります。
	const olultag = () => {(olul === "ul") ? parent.appendChild(ul).appendChild(li) : parent.appendChild(ol).appendChild(li)};
	//olulの中にliをいれるメソッドを作ります。
	olultag();
	//liの中にelementいれるメソッドを作ります。
	li.appendChild(element);
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
	config.body.map(child => createChildTag(document.body, child.element, child.contents, child?.options));

	const nav = document.getElementById('nav');
	config.menus.map((menuItem) => createListTag(nav,'a',menuItem,"ul",{id:menuItem}) );
//4/16ここまでひらめくのに30分。ulとliをうまい具合実装したい。
//しまったul>li*6>aじゃなく　(ul>li>a)*6になってしまう
//4/26

});

