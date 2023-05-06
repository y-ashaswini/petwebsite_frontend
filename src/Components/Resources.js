import { Link } from "react-router-dom";

export default function Resources() {
  return (
    <>
      <div className="md:text-3xl text-lg font-bold text-slate-600 flex justify-between">
        Resources
        <Link
          to="./contribute"
          className="bg-slate-300 text-white font-bold text-center px-3 py-1 rounded-sm cursor-pointer  outline-none hover:bg-slate-500 text-lg"
        >
          CONTRIBUTE RESOURCES
        </Link>
      </div>
      <div className="my-4 md:my-8 flex flex-col">
        <span className="bg-slate-600 text-white font-bold text-center md:p-8 p-4 md:px-6 text-2xl flex items-center">
          RESOURCES
        </span>
        <span className="bg-slate-200 text-slate-500 block md:p-8 p-4 font-bold ">
          <div className="mb-4">
            At Pettera, we believe that providing resources for stray animals is
            crucial in ensuring their well-being. We understand that taking care
            of stray animals can be a challenging and overwhelming task, which
            is why we offer various resources to make it easier for individuals
            and organizations to provide help. Our resources include information
            on guides on how to catch and transport animals safely, tips on
            providing basic medical care for animals, and a list of contacts for
            veterinary care and animal shelters.
          </div>
          <div>
            We also offer educational resources to spread awareness about the
            importance of spaying and neutering animals to control the
            population of strays. We encourage individuals and organizations to
            use our resources to help stray animals in their communities. By
            doing so, we believe that we can make a significant difference in
            the lives of these animals and create a more compassionate world for
            all creatures.
          </div>
        </span>

        {/* Links to the resource pages */}
        <div className="md:text-3xl text-lg font-bold text-slate-600 flex justify-between my-4">
          List of Essential Resources
        </div>
        <div className="grid grid-cols-4 gap-y-4">
          {/* CAT NEUTERING */}
          <div className="grid col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              CAT NEUTERING
            </span>
            <Link to="./catneutering">
              <svg
                fill="#FFFFFF"
                viewBox="0 0 32 32"
                className="p-8 bg-slate-600 m-1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>cat</title>
                <path d="M28.926 1.17l-2.182 3.608c-1.876-0.608-4.669-0.489-6.426 0l-2.102-3.557c-3.452 6.448-2.475 10.523 0.159 12.549-0.403 0.252-0.818 0.529-1.247 0.833-10.979-8.759-20.863 1.106-14.379 9.92h0.050c1.163 1.687 2.503 2.731 3.95 3.277 2.050 0.773 4.159 0.551 6.236 0.257s4.109-0.663 6.046-0.525c1.937 0.138 3.874 0.635 5.647 2.569 1.209 1.318 2.926-0.101 1.486-1.507-2.185-2.134-4.525-2.959-6.825-3.122s-4.505 0.293-6.502 0.576c-1.997 0.283-3.761 0.409-5.276-0.163-0.711-0.268-1.403-0.69-2.070-1.36h22.51c1.064-3.756 1.177-7.73-0.033-10.237 3.635-1.897 5.097-6.376 0.958-13.116zM22.176 10.872c-2.316 1.117-3.367 0.212-3.817-1.656 2.273-1.41 3.626-0.278 3.817 1.656zM25.067 10.872c0.191-1.934 1.544-3.067 3.817-1.656-0.45 1.868-1.502 2.774-3.817 1.656z"></path>
              </svg>
            </Link>
          </div>

          {/* DOG NEUTERING */}
          <div className="grid col-start-2 col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              DOG NEUTERING
            </span>
            <Link to="./dogneutering">
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="p-8 bg-slate-600 m-1"
              >
                <title>114</title>

                <defs></defs>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(0.000000, 2.000000)" fill="#FFFFFF">
                    <path
                      d="M3.348,4.007 C3.322,4.007 3.29,4.021 3.262,4.024 L3.293,3.994 L0.025,1.965 L0.011,2.562 L1.511,5.022 C1.234,5.363 1.038,5.728 1.038,6.01 L1.038,10.918 L3,10.918 L3,9.263 L5.98,7.929 L8.999,7.929 L9.666,10.918 L10.918,10.918 L10.918,5.328 L9.911,4.008 L3.348,4.008 L3.348,4.007 Z"
                      class="si-glyph-fill"
                    ></path>
                    <path
                      d="M13.752,1.623 L13.336,0.238 L10.681,2.86 L12.01,4.243 L14.82,4.847 L16.012,3.975 L13.752,1.623 Z"
                      class="si-glyph-fill"
                    ></path>
                  </g>
                </g>
              </svg>
            </Link>
          </div>

          {/* SECURING A CAT */}
          <div className="grid col-start-3 col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              SECURING A CAT
            </span>
            <Link to="./catsecuring">
              <svg
                fill="#FFFFFF"
                viewBox="0 0 32 32"
                className="p-8 bg-slate-600 m-1"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>cat</title>
                <path d="M28.926 1.17l-2.182 3.608c-1.876-0.608-4.669-0.489-6.426 0l-2.102-3.557c-3.452 6.448-2.475 10.523 0.159 12.549-0.403 0.252-0.818 0.529-1.247 0.833-10.979-8.759-20.863 1.106-14.379 9.92h0.050c1.163 1.687 2.503 2.731 3.95 3.277 2.050 0.773 4.159 0.551 6.236 0.257s4.109-0.663 6.046-0.525c1.937 0.138 3.874 0.635 5.647 2.569 1.209 1.318 2.926-0.101 1.486-1.507-2.185-2.134-4.525-2.959-6.825-3.122s-4.505 0.293-6.502 0.576c-1.997 0.283-3.761 0.409-5.276-0.163-0.711-0.268-1.403-0.69-2.070-1.36h22.51c1.064-3.756 1.177-7.73-0.033-10.237 3.635-1.897 5.097-6.376 0.958-13.116zM22.176 10.872c-2.316 1.117-3.367 0.212-3.817-1.656 2.273-1.41 3.626-0.278 3.817 1.656zM25.067 10.872c0.191-1.934 1.544-3.067 3.817-1.656-0.45 1.868-1.502 2.774-3.817 1.656z"></path>
              </svg>
            </Link>
          </div>

          {/* SECURING A DOG */}
          <div className="grid col-start-4 col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              SECURING A DOG
            </span>
            <Link to="./dogsecuring">
              <svg
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="p-8 bg-slate-600 m-1"
              >
                <title>114</title>

                <defs></defs>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(0.000000, 2.000000)" fill="#FFFFFF">
                    <path
                      d="M3.348,4.007 C3.322,4.007 3.29,4.021 3.262,4.024 L3.293,3.994 L0.025,1.965 L0.011,2.562 L1.511,5.022 C1.234,5.363 1.038,5.728 1.038,6.01 L1.038,10.918 L3,10.918 L3,9.263 L5.98,7.929 L8.999,7.929 L9.666,10.918 L10.918,10.918 L10.918,5.328 L9.911,4.008 L3.348,4.008 L3.348,4.007 Z"
                      class="si-glyph-fill"
                    ></path>
                    <path
                      d="M13.752,1.623 L13.336,0.238 L10.681,2.86 L12.01,4.243 L14.82,4.847 L16.012,3.975 L13.752,1.623 Z"
                      class="si-glyph-fill"
                    ></path>
                  </g>
                </g>
              </svg>
            </Link>
          </div>

          {/* LARGE ANIMALS*/}
          <div className="grid col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              LARGE ANIMALS
            </span>
            <Link to="./largeanimals">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="p-8 bg-slate-600 m-1"
                fill="#FFFFFF"
              >
                <path
                  d="M244.311,143.467c0,0-173.441,0-174.859,0c-19.77,0-35.7-15.792-35.7-35.562c0-9.787,3.938-18.648,10.299-25.116
	l23.137,23.137c13.4,13.4,35.129,13.4,48.529,0L80.401,70.609c-8.369-8.359-21.424-9.127-30.679-2.353
	c6.774-9.255,6.006-22.31-2.353-30.679L12.052,2.261c-13.4,13.4-13.4,35.129,0,48.529l20.646,20.646
	C13.569,88.302,2,110.218,2,134.192C2,187.073,58.297,230,128.024,230.571c0,0,0,23.167,0,23.167c0,0,11.076,0.246,20.38-7.489
	c7.036-5.85,11.127-14.865,11.127-24.017V193.7c12.721-3.013,33.219-9.816,49.386-26.603h7.827
	c-10.279,13.577-30.837,25.884-51.306,31.191v11.194c29.163-7.246,52.251-22.832,64.607-42.385h6.862
	c-12.829,22.625-38.595,40.633-71.47,48.46v6.675c0,1.516-0.098,3.003-0.276,4.47c43.931-9.698,78.056-36.773,88.414-70.751
	C255.466,149.739,250.799,143.467,244.311,143.467z M178.355,171.114h-4.874c-2.176,0-3.938-1.762-3.938-3.938
	c0-2.176,1.762-3.938,3.938-3.938h4.874c2.176,0,3.938,1.762,3.938,3.938C182.293,169.351,180.531,171.114,178.355,171.114z"
                />
              </svg>
            </Link>
          </div>

          {/* SMALL ANIMALS */}
          <div className="grid col-start-2 col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              SMALL ANIMALS
            </span>
            <Link to="./smallanimals">
              <svg
                fill="#FFFFFF"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="p-8 bg-slate-600 m-1"
              >
                <g>
                  <path
                    d="M29.3,10.1c-0.4-0.1-0.8,0-1.1,0.3l-3.2,4c-1.7-2-5.9-6.4-11-6.4c-0.2,0-0.3,0-0.5,0c1.4,2.4,2.1,5.1,2.1,8
		c0,2.8-0.7,5.6-2.1,8c0.2,0,0.3,0,0.5,0c5.1,0,9.3-4.3,11-6.4l3.2,4c0.2,0.2,0.5,0.4,0.8,0.4c0.1,0,0.2,0,0.3-0.1
		c0.4-0.1,0.7-0.5,0.7-0.9V11C30,10.6,29.7,10.2,29.3,10.1z"
                  />
                  <path
                    d="M11.4,8.4c-5.2,1.5-9,6.8-9.2,7c-0.2,0.3-0.2,0.8,0,1.2c0.2,0.3,4,5.6,9.2,7c1.5-2.3,2.2-4.9,2.2-7.6
		C13.6,13.3,12.8,10.6,11.4,8.4z M10,16c0,0.6-0.4,1-1,1s-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1V16z"
                  />
                </g>
              </svg>
            </Link>
          </div>

          {/* TRANSPORTING STRAYS */}
          <div className="grid col-start-3 col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              TRANSPORTATION
            </span>
            <Link to="./transportation">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="p-8 bg-slate-600 m-1"
              >
                <path
                  clip-rule="evenodd"
                  d="M11 2H0V13H2C2 14.1046 2.89543 15 4 15C5.10457 15 6 14.1046 6 13H10C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13H16V8C16 6.34315 14.6569 5 13 5H11V2ZM11 7V9H14V7H11Z"
                  fill="#FFFFFF"
                  fill-rule="evenodd"
                />
              </svg>
            </Link>
          </div>

          {/* SECURING A DOG */}
          <div className="grid col-start-4 col-span-1">
            <span className="bg-slate-600 text-white font-bold text-center p-2 m-1 text-lg flex items-center ">
              TREATMENT
            </span>
            <Link to="./treatment">
              <svg
                fill="#FFFFFF"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                className="p-8 bg-slate-600 m-1"
              >
                <path d="M 5.1437726,1 C 3.8705419,1 3.6677179,2.73201 3.9942398,3.6074767 4.2014407,4.1664121 4.8325467,4.7063497 5.4802212,4.4766355 6.317792,4.0625461 6.5544419,3.0007815 6.3213426,2.1775701 6.2083061,1.6291807 5.7708219,1 5.1437726,1 Z M 8.7045202,1 C 8.0774706,1 7.639987,1.6291807 7.5269501,2.1775701 7.2938514,3.0007815 7.530503,4.0625461 8.3680716,4.4766355 9.0157459,4.7063497 9.6468518,4.1664121 9.8540529,3.6074767 10.180575,2.73201 9.9777512,1 8.7045202,1 Z M 1.4974872,3.775701 C 0.99453653,4.2786516 1.0603984,5.7259965 1.9741226,6.3271028 2.566345,6.6306959 3.1674111,6.238153 3.3759918,5.7663552 3.7282343,5.0962718 3.6314374,4.1437972 3.0115058,3.6635514 2.4181204,3.2675013 1.9623141,3.3108741 1.4974872,3.775701 Z M 10.974123,3.6635514 c -0.432609,0.2497664 -0.716729,1.4327204 -0.364486,2.1028038 0.208581,0.4717982 0.837684,0.8643407 1.429906,0.5607476 C 12.953267,5.7259965 13.000929,4.288489 12.488141,3.775701 12.010882,3.3762084 11.445922,3.3911577 10.974123,3.6635514 Z M 6.9928142,4.9252337 c -2.2297852,0 -4.0373832,1.807598 -4.0373832,4.0373831 C 2.955431,11.192402 4.763029,13 6.9928142,13 9.222599,13 11.030197,11.192402 11.030197,8.9626168 c 0,-2.2297851 -1.807598,-4.0373831 -4.0373828,-4.0373831 z m -0.8971963,1.3457944 1.7943926,0 0,1.7943925 1.7943925,0 0,1.7943924 -1.7943925,0.02804 0,1.766356 -1.7943926,0 0,-1.794393 -1.7943925,0 0,-1.7943924 1.7943925,0 z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
