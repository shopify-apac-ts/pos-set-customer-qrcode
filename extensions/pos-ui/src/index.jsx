import {
  React,
  useEffect, 
  }  from 'react'
import { 
  CameraScanner,
  Tile, 
  Text, 
  Screen, 
  Stack,
  Navigator, 
  render,
  useCartSubscription,
  useExtensionApi,
  useScannerDataSubscription 
} from '@shopify/retail-ui-extensions-react'


  const SmartGridTile = () => {
    const api = useExtensionApi()
    return (
      <Tile
        title="Read Customer ID"
        subtitle="Open QR / barcode reader"
        onPress={() => {
          api.smartGrid.presentModal()
        }}
        enabled
      />
    )
  }

// SmartGridModal component that adds a scanned product to the cart
const SmartGridModal = () => {
  // Use hooks to get the extension API and scanner data
  const api = useExtensionApi();
  const { data } = useScannerDataSubscription();
  const cart = useCartSubscription();

  // Use an effect to add the scanned product to the cart when data changes
  useEffect(() => {
    // TODO: add logic to identify & associate customer
    const addCustomerToCart = (data) => {
      if (data) {
        api.cart.setCustomer({id: Number(data)});
      }
    };
    addCustomerToCart(data);
  }, [data]);

  const scannedData = `${cart?.customer?.email || ''}`
  return (
    <Navigator>
      <Screen name="reader_screen" title={scannedData} >
        <Stack direction="vertical" flexChildren flex={1}>
          <CameraScanner />
        </Stack>
      </Screen>
    </Navigator>
  );
};

  render('pos.home.tile.render', () => <SmartGridTile />)
  render('pos.home.modal.render', () => <SmartGridModal />)