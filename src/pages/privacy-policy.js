import React from "react";

//internal import
import Layout from "@layout/Layout";
import useGetSetting from "@hooks/useGetSetting";
import PageHeader from "@components/header/PageHeader";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const PrivacyPolicy = () => {
  const { storeCustomizationSetting, loading, error } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();
  // console.log("data", storeCustomizationSetting);

  return (
    <Layout title="Privacy Policy" description="This is privacy policy page">
      <PageHeader
        headerBg={storeCustomizationSetting?.privacy_policy?.header_bg}
        title={showingTranslateValue(
          storeCustomizationSetting?.privacy_policy?.title
        )}
      />
      <div className="max-w-6xl mx-auto px-4 py-8 mb-7">
     

      <div className="prose max-w-none">
        <p>
          This privacy policy sets out how SATVA CARE PRIVATE LIMITED uses and protects any information that you give SATVA CARE PRIVATE LIMITED when you use this website.
        </p>

        <p>
          <strong>SATVA CARE PRIVATE LIMITED</strong> is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, and then you can be assured that it will only be used in accordance with this privacy statement.
        </p>

        <p>
          <strong>SATVA CARE PRIVATE LIMITED</strong> may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
        </p>

        <p>We may collect the following information:</p>

        <ul className="list-disc pl-6">
          <li>Name and job title</li>
          <li>Contact information including email address</li>
          <li>Demographic information such as postcode, preferences, and interests</li>
          <li>Other information relevant to customer surveys and/or offers</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-4">What we do with the information we gather</h2>

        <p>
          We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
        </p>

        <ul className="list-disc pl-6">
          <li>Internal record keeping.</li>
          <li>We may use the information to improve our products and services.</li>
        </ul>

        <p>
          We may periodically send promotional emails about new products, special offers, or other information that we think you may find interesting using the email address that you have provided.
        </p>

        <p>
          From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax, or mail. We may use the information to customize the website according to your interests.
        </p>

        <p>
          We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in suitable measures.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">How we use cookies</h2>

        <p>
          A cookie is a small file that asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyze web traffic of lets you know where you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.
        </p>

        <p>
          We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.
        </p>

        <p>
          Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.
        </p>

        <p>
          You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Controlling your personal information</h2>

        <p>
          You may choose to restrict the collection or use of your personal information in the following ways:
        </p>

        <p>
          whenever you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used by anybody for direct marketing purposes
        </p>

        <p>
          If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at <a href="mailto:Shasvatcropscience@gmail.com" className="text-blue-600">shasvatcropscience@gmail.com</a>
        </p>

        <p>
          We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.
        </p>

        <p>
          If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the above address. We will promptly correct any information found to be incorrect.
        </p>
      </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
