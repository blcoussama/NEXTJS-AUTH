"use client"

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import AuthHeader from "./AuthHeader"
import { BackButton } from "./BackButton"

interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    title: string,
    showSocial?: boolean,
    backButtonHref: string
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, title, backButtonHref, showSocial }: CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <AuthHeader label={headerLabel} title={title} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper