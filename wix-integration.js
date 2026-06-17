// MangoPark - Wix Headless Entegrasyonu
const WIX_CLIENT_ID = 'd4244f7a-3365-4501-8fdb-3586d9f39aba';

document.addEventListener('DOMContentLoaded', function() {
  
  // Wix SDK yüklenince başlat
  if (window.wix) {
    const client = window.wix.createClient({
      auth: window.wix.OAuthStrategy({
        clientId: WIX_CLIENT_ID
      })
    });
    
    window.wixClient = client;
    
    // Analytics - sayfa görüntüleme
    trackPageView();
    
    console.log('✅ Wix Headless bağlandı');
  }
});

function trackPageView() {
  console.log('📊 Sayfa takibi:', window.location.pathname);
}

// Form gönderme
window.wixSubmitForm = async function(formId, data) {
  try {
    await window.wixClient.forms.submit(formId, data);
    return { success: true };
  } catch(err) {
    return { success: false, error: err };
  }
}
