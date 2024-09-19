import { MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const options = {
  renderMark: {
    [MARKS.CODE]: text => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      )
    }
  },
}

const RichText = ({ content }) => {
  return <>{documentToReactComponents(content, options)}</>
}

export default RichText
