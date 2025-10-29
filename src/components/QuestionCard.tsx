import { Card } from '@/components/ui/card'
import { Heart, Loader2 } from 'lucide-react'

interface QuestionCardProps {
  question: string
  isLoading?: boolean
}

export const QuestionCard = ({
  question,
  isLoading = false,
}: QuestionCardProps) => {
  return (
    <Card className="relative overflow-hidden border-border/50">
      <div className="absolute inset-0 from-primary/5 to-secondary/5" />
      <div className="relative p-8 md:p-12 flex flex-col items-center justify-center min-h-[300px] md:min-h-[350px]">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-lg text-muted-foreground">Gerando pergunta...</p>
          </div>
        ) : (
          <>
            <Heart className="w-12 h-12 text-primary mb-6 animate-pulse" />
            {question ? (
              <p className="text-2xl md:text-3xl text-center font-medium text-foreground leading-relaxed animate-fade-in">
                {question}
              </p>
            ) : (
              <p className="text-xl md:text-2xl text-center text-muted-foreground">
                Clique no botão abaixo para gerar uma pergunta ❤️
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  )
}
