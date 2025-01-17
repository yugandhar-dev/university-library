import { cn } from "@/lib/utils"
import Image from "next/image"
import BookCoverSvg from "./BookCoverSvg"

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide"

const variantStyles: Record<BookCoverVariant, string> = {
  extraSmall: "book-cover_extra-small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
}

type Props = {
  className?: string
  variant?: BookCoverVariant
  coverColor: string
  coverUrl: string
  withSvg?: boolean
}

const BookCover = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverUrl = "https://placehold.co/400x600.png",
  withSvg = true,
}: Props) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      {withSvg && <BookCoverSvg coverColor={coverColor} />}
      <div
        className="absolute z-10"
        style={
          withSvg
            ? { left: "12%", width: "87.5%", height: "88%" }
            : { width: "100%", height: "100%" }
        }
      >
        <Image
          src={coverUrl}
          alt="book cover"
          fill
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  )
}
export default BookCover
