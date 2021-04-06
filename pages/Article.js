// module
import fs from 'fs'
import Link from 'next/link'

// component
import { readContentFiles } from '../lib/content-loader'

const Article = (props) => {

  const { posts,hasArchive } = props

  return (
    <div>
      {posts.map((post) => <div
        key={post.slug}
        className="post-teaser"
        >
          <h2><Link href="/posts/[id]" as={`/posts/${post.slug}`}><a>{post.title}</a></Link></h2>
          <h2><span>{post.published}</span></h2>
        </div>)}
        {hasArchive ? (
          <div className="home-archive">
            <Link href="/archive/[page]" as="/archive/1"><a>アーカイブ</a></Link>
          </div>
        ) : ``}
    </div>
  )
}

export async function getStaticProps ({ params }) {
  const MAX_COUNT = 5
  const posts = await readContentFiles({ fs })
  const hasArchive = posts.length > MAX_COUNT

  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
      hasArchive,
    }
  }
}

export default Article