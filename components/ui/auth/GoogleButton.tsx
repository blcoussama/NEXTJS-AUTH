"use client"

import { googleAuthenticate } from "@/actions/googleLogin"
import { useActionState } from "react"
import { BsGoogle } from "react-icons/bs"
import { Button } from "@/components/ui/button"

const GoogleLogin = () => {
    const [googleErrorMsg, dispatchGoogle] = useActionState(googleAuthenticate, undefined)
    return (
        <form className="flex mt-4" action={dispatchGoogle}>
            <Button variant="outline" className="flex flex-row items-center gap-3 w-full">
                <BsGoogle />
                Google Sign In
            </Button>
            <p>{googleErrorMsg}</p>
        </form>
    )
}

export default GoogleLogin