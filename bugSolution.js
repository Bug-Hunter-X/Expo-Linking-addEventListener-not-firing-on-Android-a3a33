This solution uses both `Linking.getInitialURLAsync()` and `Linking.addEventListener` to handle the potential race condition where the event listener might not be set up in time to catch the initial deep link:

```javascript
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const handleUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        setInitialUrl(url);
      }
    };
    handleUrl();
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', (event) => {
      setInitialUrl(event.url);
    });
    return () => subscription.remove();
  }, []);

  if (initialUrl) {
    // Process the deep link URL
    console.log('Deep link received:', initialUrl);
    // Extract data from initialUrl
  } else {
    // App opened without a deep link
  }
  // ... rest of your app code
}
```