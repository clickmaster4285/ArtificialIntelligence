const CRM_ENDPOINT = "https://crm.clickmasters.pk/api/leads";

// ⚠️ Values for THIS website (clickmastersartificialintelligencecompany.com)
// See the CRM integration guide for other websites' values.
const CRM_WEBSITE = "clickmastersartificialintelligencecompany.com";
const CRM_SERVICE = "Artificial Intelligence";

export type CrmLeadInput = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
};

/**
 * Submits a lead to the central ClickMasters CRM.
 * Automatically captures landing page, referrer and UTM parameters.
 * Throws an Error with a readable message when submission fails.
 */
export async function submitLeadToCrm(lead: CrmLeadInput): Promise<void> {
  const searchParams = new URLSearchParams(window.location.search);

  const response = await fetch(CRM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: lead.name,
      email: lead.email,
      phone: lead.phone ?? "",
      message: lead.message ?? "",
      website: CRM_WEBSITE,
      service: CRM_SERVICE,
      landingPage: window.location.href,
      referrer: typeof document !== "undefined" ? document.referrer : "",
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      utm_term: searchParams.get("utm_term") || "",
      utm_content: searchParams.get("utm_content") || "",
    }),
  });

  if (!response.ok) {
    let errorMessage = "Submission failed. Please try again.";

    try {
      const data = (await response.json()) as { error?: string };

      if (data?.error) {
        errorMessage = data.error;
      }
    } catch {
      // Non-JSON error response — keep the default message.
    }

    throw new Error(errorMessage);
  }
}
