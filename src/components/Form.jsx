import { useState } from "react"
import SuccessMessage from "./SuccessMessage";

export default function From(){
    const[formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        queryType: '',
        message: '',
        consent: false,
    })

    const[error,setError] = useState({});
    const[submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const{name, value, type, checked} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const validate = () => {
        const newErrors = {};
        if(!formData.fname.trim()) newErrors.fname = "This Field is required";
        if(!formData.lname.trim()) newErrors.lname = "This Field is required";
        if(!formData.email.trim()) newErrors.email = "Email address Required";
        if(!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Plese enter a valide email address";
        if(!formData.queryType) newErrors.queryType = "Plese slelect a query type";
        if(!formData.message) newErrors.message = "This Field is required"
        if (!formData.consent) newErrors.consent = "To submit this form, please consent to being contacted";
        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if(Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            console.log(validationErrors);
        } else{
            setError({});
            setSubmitted(true);
             setFormData({
                fname: '',
                lname: '',
                email: '',
                queryType: '',
                message: '',
                consent: false,
            });
        }
    }
    
    return(
        <>
        {submitted && <SuccessMessage/>}
        <h1>Contact Us</h1>
         <form onSubmit={handleSubmit}>
            <div className="inputs-container">
                <div className="field-box">
                    <label htmlFor="f-name" className="field-name">First Name * </label>
                    <input type="text" name="fname" className={error.fname ? "input-error" : ""} id="f-name" value={formData.fname} onChange={handleChange}/>
                    {error.fname && <p className="error-message">{error.fname}</p>}
                </div>
                <div className="field-box">
                    <label htmlFor="l-name" className="field-name">Last Name * </label>
                    <input type="text" name="lname" className={error.lname ? "input-error" : ""} id="l-name" value={formData.lname} onChange={handleChange}/>
                    {error.lname && <p className="error-message">{error.lname}</p>}
                </div>
            </div>
            
            <div className="field-box">
                <label htmlFor="email" className="field-name">Email Address * </label>
                <input type="email" name="email" className={error.email ? "input-error" : ""} id="email" value={formData.email} onChange={handleChange}/>
                {error.email && <p className="error-message">{error.email}</p>}
            </div>
            
            <div>
            <legend className="field-name">Query Type *</legend>
            <div className="inputs-container">
                <div className="option-box">
                    <input type="radio" name="queryType" id="general-enquiry" value="General Enquery" checked = {formData.queryType === "General Enquery"} onChange={handleChange}/>
                    <label htmlFor="general-enquiry">General Enquiry</label>
                </div>
                <div className="option-box">
                    <input type="radio" name="queryType" id="suport-request" value="Suport Request" checked = {formData.queryType === "Suport Request"} onChange={handleChange}/>
                    <label htmlFor="suport-request">Suport Request</label>
                </div>
                {error.queryType && <p className="error-message">{error.queryType}</p>}
            </div>
            </div>
            
            <div className="field-box">
                <label htmlFor="message" className="field-name">Message *</label>
                <textarea name="message" className={error.message ? "input-error" : ""} id="message" value={formData.message} onChange={handleChange}></textarea>
                {error.message && <p className="error-message">{error.message}</p>}
            </div>
            
            <div className="field-box">
                <div className="consent-field">
                 <div>
                  <input type="checkbox" name="consent" id="consent" checked={formData.consent} onChange={handleChange} />
                 </div>
                 <label htmlFor="consent">I consent to being contacted by the team *</label>
                </div>
                {error.consent && <p className="error-message">{error.consent}</p>}
            </div>

            <button type="submit">Submit</button>

         </form>
            
        </>
    )
}