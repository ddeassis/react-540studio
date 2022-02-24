import * as React from "react";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";

export default function Form({ onChildClick }) {
  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const [disabled, setDisabled] = React.useState(false);
  const [readyToSubmit, setReadyToSubmit] = React.useState(false);
  const [formComplete, setFormComplete] = React.useState(false);
  const [recaptchaPassed, setRecaptchaPassed] = React.useState(null);
  const [selectedRequest, setSelectedRequest] = React.useState(
    watch("request", null)
  );
  const [showNext, setShowNext] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [previousStep, setPreviousStep] = React.useState(null);

  React.useEffect(() => {
    const subscription = watch((data) => {
      if (data.request) {
        setSelectedRequest(data.request);
        setShowNext(true);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  /**
   *
   * @param {array} values
   */
  const onSubmit = async (values) => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: "submit" })
        .then((token) => {
          submitData(values, token);
        });
    });
  };

  /**
   *
   * @param {array} values
   * @param {string} recaptchaToken
   */
  const submitData = async (values, recaptchaToken) => {
    // setDisabled(true);
    try {
      const { name, email, reason, question } = values;
      await axios({
        url: "/api/get-help",
        method: "POST",
        data: {
          name,
          email,
          reason,
          question,
          recaptchaToken,
        },
      }).then((res) => {
        if (res.status === 200) {
          reset();
          setFormComplete(true);
          setDisabled(false);
        } else {
          setRecaptchaPassed(false);
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(
          "Server responded with non 2xx code: ",
          error.response.data
        );
      } else if (error.request) {
        console.log("No response received: ", error.request);
      } else {
        console.log("Error setting up response: ", error.message);
      }
    }
  };

  return (
    <HelmetProvider>
      <div className="text-white mx-4 md:mx-2 lg:mx-0">
        <Helmet>
          <script
            key="recaptcha"
            type="text/javascript"
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`}
          />
        </Helmet>
        <button
          onClick={onChildClick}
          className="block mx-auto bg-black px-3 py-2 border border-white rounded my-4 md:my-6 lg:my-8"
        >
          Cancel Request
        </button>
        <hr />
        <p className="my-4 md:my-6 lg:my-8">
          Mustache typewriter cardigan shaman, yuccie meh hella polaroid
          live-edge 8-bit raw denim synth dreamcatcher. Chartreuse wolf green
          juice air plant butcher +1 organic unicorn bicycle rights. Jean shorts
          sriracha quinoa, marfa cray trust fund try-hard shaman jianbing.
          Celiac mlkshk normcore, locavore jianbing VHS tofu iceland vape
          literally small batch whatever tousled. Pitchfork ramps cardigan
          try-hard VHS succulents tote bag plaid offal. Echo park waistcoat
          knausgaard, letterpress raw denim tacos whatever street art swag food
          truck small batch church-key trust fund.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
          {/* FORM PART 1 */}
          <div className={`${step > 1 && ` hidden`}`}>
            <label
              htmlFor="name"
              className="block md:text-lg lg:text-xl my-2 md:my-3 lg:my-4 border-b border-white"
            >
              <span className="sr-only">Enter your first and last names</span>
              <input
                type="text"
                name="name"
                placeholder="Please Enter Your Full Name"
                className="rounded h-10 text-white bg-stone-900 text-xl block w-full px-4 py-1"
                {...register("name", {
                  required: "Your name is required.",
                })}
              />
            </label>
            {errors.name && (
              <p className="text-red-500 dark:text-yellow-300">
                &uarr; {errors.name.message}
              </p>
            )}
            <label
              htmlFor="email"
              className="block md:text-lg lg:text-xl my-2 md:my-3 lg:my-4 border-b border-white"
            >
              <span className="sr-only">Enter your email username</span>
              <input
                type="text"
                name="first-name"
                placeholder="Your Username"
                className="rounded h-10 w-1/2 text-white bg-stone-900  md:text-lg lg:text-xl mr-1 text-center px-4 py-1 "
                {...register("email", {
                  required: "Your email username is required.",
                })}
              />
              @longbranch.k12.nj.us
            </label>
            <label
              htmlFor="building"
              className="block my-2 md:my-3 lg:my-4 py-1 md:text-lg lg:text-xl"
            >
              <span className="sr-only">Select Your Building</span>
              <select
                defaultValue={"DEFAULT"}
                name="building"
                className="mt-4 md:mt-5 lg:mt-6 block rounded h-10 w-full text-white bg-stone-900 md:text-lg lg:text-xl mr-1 text-center py-1 "
                {...register("building", {
                  required: "A building is required.",
                  pattern: "^((?!Select).)*$",
                })}
              >
                <option value="DEFAULT" disabled>
                  -- select your building --
                </option>
                <option value="540">540 Broadway</option>
                <option value="AAA">Amerigo A. Anastasia School</option>
                <option value="ALT">Alternative Academy</option>
                <option value="GLC">George L. Catrambone School</option>
                <option value="GRE">Gregory School</option>
                <option value="JMF">Joseph M. Ferraina ECLC</option>
                <option value="LWC">Lenna W. Conrow ECLC</option>
                <option value="LBHS">Long Branch High School</option>
                <option value="SOSJ">LBHS School of Social Justice</option>
                <option value="LBMS">Long Branch Middle School</option>
                <option value="MOR">Morris Avenue ECLC</option>
                <option value="WAV">Little Waves</option>
                <option value="OTH">Other</option>
              </select>
            </label>
            <label
              htmlFor="department"
              className="block md:text-lg lg:text-xl my-2 md:my-3 lg:my-4 border-b border-white"
            >
              <span className="sr-only">Enter your department</span>
              <input
                type="text"
                name="department"
                placeholder="Please Enter Your Department"
                className="rounded h-10 text-white bg-stone-900 text-xl block w-full px-4 py-1"
                {...register("department", {
                  required: "Your name is required.",
                })}
              />
            </label>
            <div className="flex flex-col space-y-4 md:text-lg lg:text-xl my-2 md:my-3 lg:my-4">
              <p>I am requesting...</p>
              <div>
                <input
                  type="radio"
                  id="requestChoice1"
                  name="request"
                  value="video"
                  className="ml-4 accent-green-500"
                  {...register("request", {
                    required: "A request type is required.",
                  })}
                />
                <label htmlFor="requestChoice1" className="ml-4">
                  Video Production (Filming &amp; Editing)
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="requestChoice2"
                  name="request"
                  value="photography"
                  className="ml-4 accent-green-500"
                  {...register("request", {
                    required: "A request type is required.",
                  })}
                />
                <label htmlFor="requestChoice2" className="ml-4">
                  Photography
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="requestChoice3"
                  name="request"
                  value="flyer"
                  className="ml-4 accent-green-500"
                  {...register("request", {
                    required: "A request type is required.",
                  })}
                />
                <label htmlFor="requestChoice3" className="ml-4">
                  Flyer Creation
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="requestChoice4"
                  name="request"
                  value="logo"
                  className="ml-4 accent-green-500"
                  {...register("request", {
                    required: "A request type is required.",
                  })}
                />
                <label htmlFor="requestChoice4" className="ml-4">
                  Logo Creation
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="requestChoice5"
                  name="request"
                  value="other"
                  className="ml-4 accent-green-500"
                  {...register("request", {
                    required: "A request type is required.",
                  })}
                />
                <label htmlFor="requestChoice5" className="ml-4">
                  Other (Option not listed)
                </label>
              </div>
            </div>
          </div>
          {/* END FORM PART 1 */}
          {/* FORM PART 2 */}
          {step >= 2 && (
            <div className={`${step !== 2 && ` hidden `}`}>
              <h2 className="text-2xl text-center">
                Video Production (Filming &amp; Editing)
              </h2>
              <label
                htmlFor="videoEventName"
                className="block md:text-lg lg:text-xl my-2 md:my-3 lg:my-4 border-b border-white"
              >
                <span className="sr-only">Enter your event name</span>
                <input
                  type="text"
                  name="videoEventName"
                  placeholder="Please Enter Your Event Name (Reason for Video)"
                  className="rounded h-10 text-white bg-stone-900 text-xl block w-full px-4 py-1"
                  {...register("videoEventName", {
                    required: "Your name is required.",
                  })}
                />
              </label>
              {errors.videoEventName && (
                <p className="text-red-500 dark:text-yellow-300">
                  &uarr; {errors.videoEventName.message}
                </p>
              )}
            </div>
          )}

          <div className={`grid grid-cols-2 gap-x-4`}>
            {!isValid && (
              <p className="text-red-500 col-span-2 text-center my-3 md:my-4 lg:my-6">
                Please complete all required fields before moving on.
              </p>
            )}
            <button
              type="button"
              className={`bg-stone-700 text-white rounded px-3 py-2 border border-stone-200 transition duration-500 ease-in-out opacity-100 ${
                step === 1 && `invisible`
              }`}
              onClick={() => {
                if (step < 6) {
                  setStep(1);
                } else {
                  setStep(previousStep);
                }
                setShowNext(true);
              }}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!isValid}
              className={`${
                isValid
                  ? ` bg-stone-700 text-white border-green-500`
                  : `bg-stone-800 text-stone-500 border-red-500`
              } text-white rounded px-3 py-2 border  transition duration-500 ease-in-out opacity-100 
              }`}
              onClick={() => {
                if (step === 1) {
                  switch (selectedRequest) {
                    case "video":
                      setStep(2);
                      setPreviousStep(1);
                      setShowNext(false);
                      break;
                    case "photography":
                      setStep(3);
                      setShowNext(false);
                      break;
                    case "flyer":
                      setStep(4);
                      setShowNext(false);
                      break;
                    case "logo":
                      setStep(5);
                      setShowNext(false);
                      break;
                    default:
                      console.log("default");
                  }
                } else {
                  setPreviousStep(step);
                  setStep(6);
                }
              }}
            >
              Next
            </button>
          </div>
          {readyToSubmit && (
            <button type="submit" className="bg-green-500 px-3 py-2 rounded">
              Submit
            </button>
          )}
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </form>
      </div>
    </HelmetProvider>
  );
}
