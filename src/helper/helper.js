const validLoginForm = (data, type) => {
    const error = {}
    const { name, email, password, comfirmPassword, isAccept } = data

    if (type === "signin") {
        if (!name.trim()) {
            error.name = "یک نام کاربری وارد کنید"
        } else if (name.length < 1) {
            error.name = "یک نام کاربری معتبر وارد کنید"
        }
        if (comfirmPassword.length === 0) {
            error.comfirmPassword = "رمز را وارد کنید"
        } else if (comfirmPassword !== password) {
            error.comfirmPassword = "رمز با تکرار رمز برابر نیست"
        }
        if (!isAccept) {
            error.isAccept = "همه قوانین رو قبول کنید"
        }
    }



    if (email.length === 0) {
        error.email = "ایمیل خود را وارد کنید"
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        error.email = "یک ایمیل معتبر وارد کنید"
    }

    if (password.length === 0) {
        error.password = "رمز را وارد کنید"
    } else if (password.length < 6) {
        error.password = "رمز کوتاه می باشد"
    }





    return error

}

const validCommentForm = (data) => {
    const error = {}
    const { name, email, text } = data
    if (!name.trim()) {
        error.name = "نام کاربری را وارد کنید"
    } else if (name.length < 2) {
        error.name = "بک نام کاربری معتبر وارد کنید"
    }

    if (email.length == 0) {
        error.email = "یک ایمیل وارد کنید"
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        error.email = "یک ایمیل معتبر وارد کنید"
    }

    if (text.length < 3) {
        error.text = "یک متن صحیح وارد کنید"
    }

    return error

}

const searchCoustomer = (data, type) => {
    if (type === "send") {
        const low = data.toLowerCase()
        const split = low.split(" ")
        const result = split.join("-")
        return result
    }

    if (type === "recive") {
        const split = data.split("-")
        const result = split.join(" ")
        return result
    }

}

export { validLoginForm, validCommentForm, searchCoustomer }