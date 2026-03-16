
        document.addEventListener("DOMContentLoaded", function () {

//var apiprefixurl='http://localhost/llm/signageportal';
var apiprefixurl='https://devapp.oselsignage.com';

const reCabtchaBtn = document.getElementById('reCabtchaBtn');
let captchaQuestion =  document.getElementById('captcha-question');
let captchaAnswer; 

function generateCaptcha() {
        // const num1 = Math.floor(Math.random() * 10) + 1; 
        // const num2 = Math.floor(Math.random() * 10) + 1; 
        // const question = `${num1} + ${num2}`;
        // const answer = num1 + num2;

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let captcha = "";
        for (let i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const question = captcha;
        const answer = captcha;

        captchaQuestion.textContent = question;
        return answer;
    }

    captchaAnswer = generateCaptcha(); // Generate on page load

    if(reCabtchaBtn){
        reCabtchaBtn.addEventListener('click', function(){
            captchaAnswer = generateCaptcha();
        })
    }

            const countrySelect = document.querySelector("select[name='country']");
            const stateSelect = document.querySelector("select[name='state']");
            const citySelect = document.querySelector("select[name='city']");
            const form = document.querySelector("form");

            // Load countries on page load
            fetch(apiprefixurl+'/api/get-countries')
                .then(response => response.json())
                .then(countries => {
                    countries.forEach(country => {
                        const option = document.createElement("option");
                        option.value = country.id;
                        option.textContent = country.name;
                        countrySelect.appendChild(option);
                    });
                })
                .catch(error => console.error("Error loading countries:", error));

            // Load states based on country selection
            countrySelect.addEventListener("change", function () {
                const countryId = this.value;
                stateSelect.innerHTML = '<option value="">Select state</option>';
                citySelect.innerHTML = '<option value="">Select city</option>'; // Clear cities

                if (countryId) {
                    fetch(`${apiprefixurl}/api/get-states/${countryId}`)
                        .then(response => response.json())
                        .then(states => {
                            states.forEach(state => {
                                const option = document.createElement("option");
                                option.value = state.id;
                                option.textContent = state.name;
                                stateSelect.appendChild(option);
                            });
                        })
                        .catch(error => console.error("Error loading states:", error));
                }
            });

            // Load cities based on state selection
            stateSelect.addEventListener("change", function () {
                const stateId = this.value;
                citySelect.innerHTML = '<option value="">Select city</option>'; // Clear cities

                if (stateId) {
                    fetch(`${apiprefixurl}/api/get-cities/${stateId}`)
                        .then(response => response.json())
                        .then(cities => {
                            cities.forEach(city => {
                                const option = document.createElement("option");
                                option.value = city.id;
                                option.textContent = city.name;
                                citySelect.appendChild(option);
                            });
                        })
                        .catch(error => console.error("Error loading cities:", error));
                }
            });

            // Submit the form using AJAX
            form.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevent the default form submission behavior
// Validate CAPTCHA
        // const userAnswer = parseInt(document.getElementById('captcha-answer').value, 10);
        const userAnswer = document.getElementById('captcha-answer').value;
        
        if (userAnswer !== captchaAnswer) {
            alert('Incorrect CAPTCHA. Please try again.');
            captchaAnswer = generateCaptcha(); // Generate a new CAPTCHA
            return;
        }
                // Gather form data
                const formData = {
                    //salutation: form.querySelector("select[name='salutation']").value,
                    name: form.querySelector("input[placeholder='Enter your name']").value,
                    designation: form.querySelector("input[placeholder='Enter your designation']").value,
                    mobile: form.querySelector("input[placeholder='Enter your contact number']").value,
                    email: document.getElementById('email').value,
                    company: form.querySelector("input[placeholder='Enter company name']").value,
                    category: form.querySelector("select[name='category']").value,
                    subcategory: form.querySelector("select[name='subcategory']").value,
                    country: countrySelect.value,
                    state: stateSelect.value,
                    city: citySelect.value,
                    channel: 'Website',
                    message: form.querySelector("textarea").value
                };

                // Send data using fetch
                fetch(apiprefixurl+'/api/contactus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    //alert("Form submitted successfully!");
                    console.log("Response:", data);
                    window.location.href="thankyou.html"
                })
                .catch(error => {
                    console.error("Error submitting the form:", error);
                    alert("There was an error submitting the form. Please try again.");
                });
            });
        });





