/**
 * PageHeaderText Component
 * 
 * Displays the header title of a page.
 * 
 * Props:
 *  - text (string): Name of the page to display.
 */
const PageHeaderText = ({text}) => {
  return <p className="text-headline text-2xl font-semibold">{text}</p>
}

export default PageHeaderText