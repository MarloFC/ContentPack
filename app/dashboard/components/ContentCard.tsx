'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Post } from '@/types/content'

interface ContentCardProps {
  post: Post
  index: number
}

export function ContentCard({ post, index }: ContentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Post {index + 1}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">{post.title}</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {post.text}
          </p>
        </div>

        {post.script && (
          <div>
            <h5 className="text-sm font-medium mb-1">Script:</h5>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {post.script}
            </p>
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, i) => (
              <Badge key={i} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
