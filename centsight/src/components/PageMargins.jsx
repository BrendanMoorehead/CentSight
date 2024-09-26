/**
 * PageMargins Component
 * 
 * Controls the margins and spacing of any page passed as children.
 * 
 * Props:
 *  - children (components): Page contents to be displayed within the margins.
 */
const PageMargins = ({children}) => {
  return (
    <div className="py-6 mx-6 md:mx-8 lg:mx-12 2xl:mx-48">
        {children}
    </div>
  )
}

export default PageMargins