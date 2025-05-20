export default function SuccessMessage(){
    return(
        <div className="success-mess-box">
            <div className="flex gap-4">
                <img src="./assets/images/icon-success-check.svg"/>
                <strong className="font-bold text-white">Message Sent</strong>
            </div>
            <div>
                <p className="font-normal text-white">Thanks for completing the form. we'll be in touch soon.</p>
            </div>
        </div>
    )
}