import { div, a, img, p, span} from './js/skruv/html.js'

const item = (date, text) => p({class: 'news-item'}, div({class:'date'}, date), text)

export const news = 
div({class: 'news'},
	item("August 2022", "Junxue Zhang defended his PhD! Topic: Towards Efficient Transports for Datacenter Networking with High Environmental Variations"),
	item("August 2022", "DGS accepted to ICNP '22."),
	item("July 2022", "S-RDMA accepted to NSDI '23"),
	item("July 2022", "2 papers accepted to FL-IJCAI '22"),
	item("May 2022", "CrossTReS and FedSVD accepted to KDD '22"),
	item("May 2022", "LiteFlow accepted to SIGCOMM '22"),
	item("May 2022", "Herald and PLB accepted to APNet '22"),
	item("Mar 2022", "FAERY accepted to OSDI '22"),
)