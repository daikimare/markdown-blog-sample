// module
import fs from 'fs'
import path from 'path'

// component
import { listContentFiles, readContentFile } from '../../lib/content-loader'

const Post = (params) => {
  return (
    <div>
      <div className="post-meta">
        <span>{params.published}</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: params.content}} />
    </div>
  )
}

export async function getStaticProps ({params}) {
  const content = await readContentFile({ fs, slug: params.slug })

  return {
    props: {
      ...content
    }
  }
}

export async function getStaticPaths () {
  const paths = listContentFiles({ fs })
    .map((filename) => ({
      params: {
        slug: path.parse(filename).name,
      }
    }))
  
  return {
    paths,
    fallback: false
  }
}

export default Post
