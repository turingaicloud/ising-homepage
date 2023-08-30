import { div, a, img, p, span} from './js/skruv/html.js'

const item = (date, text) => p({class: 'news-item'}, div({class:'date'}, date), text)

export const news = 
div({class: 'news'},
item("Aug 2023","GeniBatch accepted to EuroSys'24"),
item("Aug 2023","CORA accepted to USENIX Security'24"),
item("July 2023","Proteus, DSA and FlowSail accepted to ICNP'23"),
item("July 2023","QClimb accepted to NSDI'24"),
item("May 2023","TransGTR and TrustGeo accepted to KDD'23"),
item("Apr 2023","Aquarius and Tassel accepted to APNet'23"),
item("Feb 2023","G3 accepted to SIGMOD'23"),
item("Jan 2023","Egeria and Tabi accepted to EuroSys'23"),
)
