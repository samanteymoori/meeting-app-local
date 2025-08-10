const Page = () => {
  return (
    <div className="grid gap-4 p-16" id="privacy-policy">
      <h1>Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> 2025-01-01
      </p>
      <p>
        <strong>Last Updated:</strong> 2025-01-01
      </p>

      <h2>1. Introduction</h2>
      <p>
        VanVibe (“we,” “our,” “us”) is committed to protecting your privacy.
        This Privacy Policy explains how we collect, use, and protect your
        personal information when you use our service.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>
          <strong>Account Information:</strong> Name, email address, profile
          photos, age, and any optional details you provide.
        </li>
        <li>
          <strong>Location Data:</strong> Your device’s GPS location (only with
          your consent) to show nearby users.
        </li>
        <li>
          <strong>Communications:</strong> Messages you send and receive through
          the platform.
        </li>
        <li>
          <strong>Device Information:</strong> IP address, browser type, and
          usage data (for analytics and security).
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and improve our service.</li>
        <li>
          Show your profile to other users within your selected location range.
        </li>
        <li>Facilitate communication between users.</li>
        <li>Maintain safety and prevent misuse of the platform.</li>
        <li>Comply with legal obligations.</li>
      </ul>

      <h2>4. Location Data</h2>
      <p>
        We <strong>never</strong> share your exact location publicly without
        your consent. By default, your location will appear as an{" "}
        <em>approximate area</em> (e.g., within 500 meters–2 km).
      </p>

      <h2>5. Sharing of Information</h2>
      <p>We do not sell your data. We may share your information only:</p>
      <ul>
        <li>With service providers who help us operate the platform.</li>
        <li>If required by law or to protect safety.</li>
        <li>With your consent.</li>
      </ul>

      <h2>6. Your Rights</h2>
      <p>You may:</p>
      <ul>
        <li>Access, update, or delete your account at any time.</li>
        <li>Withdraw consent for location tracking.</li>
        <li>Request a copy of your personal data.</li>
      </ul>
      <p>
        To make a request, email:{" "}
        <a href="mailto:info@vanvibe.ca">info@vanvibe.ca</a>.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We use encryption and secure servers to protect your data. However, no
        method is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Updates will be
        posted on this page with the new effective date.
      </p>
    </div>
  );
};
export default Page;
