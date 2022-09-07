import { div, a, img, css} from './js/skruv/html.js'

const header_style = css`
.menu-container { background-color: #452d69; justify-content: center;}
.menu-item-container {width: 60%; justify-content: flex-end;}
.menu { min-height: 70px; max-width: 960px; align-items: center; margin: 0 auto;}
.logo { margin-right: auto;} 
.logo img {height:  40px;}
.menu-item:not(:last-child) { margin-right: 1rem; }
.menu-item a { color: white; text-decoration: none; font-size: 1rem}
@media(max-width: 575.98px) {
	.logo { margin: 0 auto; margin-top: .75rem; margin-bottom: .5rem; text-align: center;}
	.menu-item-container { margin-bottom: 0.5rem; width: 100%; justify-content: center;}
}
`
const item = (name, link) => div({class: 'menu-item p-2'}, a({href:link}, name))

export const header = 
div({class: 'menu-container sticky-top'},
	div({class: 'menu row'},
		div({class: 'logo col-sm-2'},
			a({href: '/'}, img({src:'/images/assets/logo.png', class:'d-inline-block align-top'}))
		),
		div({class:'menu-item-container d-flex col-sm-10'},
			item("Home", "/"),
			item("People", "/people.html"),
			item("Publications", "/publications.html"),
			item("TACC", "https://tacc.ust.hk/"),
		)
	),
	header_style
)

const footer_style = css`
.footer {
	min-height: 100px;
	text-align: center;
	font-size: .9rem;
	justify-content: center;
	padding-top: 2rem;
	padding-bottom: 2rem;
	background-color: #f0f0f0;
}
`
export const footer = 
div({class: 'footer'},
	div({}, img({src:'/images/assets/logo-colored.png', style:'height: 3rem; margin-bottom: 1rem'})),
	div({}, 'Academic Building Room 3661, HKUST'),
	div({}, 'Clear Water Bay, Hong Kong'),
	div({}, '© iSING Lab HKUST'),
	footer_style
)
