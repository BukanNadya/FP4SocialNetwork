export const modalConfig = {
    forgot: {
        title: "find your twitter account",
        text: "enter the email, phone number, ot username associated with your account to change your password",
        buttonText: "next",
        placeholder: "email",
        inputType: "email",
        iconStatus: false,
        typeButton: "submit",
        name: "userName"
    },
    sendCode: {
        title: "Where should we send a confirmation code?",
        text: "Before you can change your password, we need to make sure it's really you.",
        secondText: "Start by choosing where to send a confirmation code.",
        buttonText: "next",
        secondaryButtonText: "cancel",
        link: "Twitter Support",
        linkText: "Contact ",
        secondLinkText: " if you don't have access.",
        boldText: "Send an email to",
        typeButton: "submit",
        secondTypeButton: "cancel"
    },
    weSent: {
        title: "We sent you a code",
        text: "Check your email to get your confirmation code, go back and reselect a confirmation",
        buttonText: "next",
        secondaryButtonText: "back",
        placeholder: "Enter your code",
        inputType: "text",
        typeButton: "submit"
    },
    choose: {
        title: "Choose a new password",
        link: "strong password",
        linkText: "Make sure your new password is 8 characters or more. Try including numbers, letters, and punctuation marks for a ",
        text: "You'll be logged out of all active Twitter sessions after your password is changed.",
        buttonText: "change password",
        placeholder: "Enter a new password",
        secondPlaceholder: "Confirm your password",
        inputType: "text",
        typeButton: "submit",
        name: "password",
        secondName: "confirmPassword"
    },
    allSet: {
        boldText: "You're all set",
        text: "You've successfully changed your password.",
        buttonText: "continue to Twitter",
        typeButton: "button"
    }
}