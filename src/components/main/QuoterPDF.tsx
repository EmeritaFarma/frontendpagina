import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import OutfitRegular from '@/assets/font/Outfit-Regular.ttf';
import OutfitMedium from '@/assets/font/Outfit-Medium.ttf';
import OutfitSemiBold from '@/assets/font/Outfit-SemiBold.ttf';
import OutfitBold from '@/assets/font/Outfit-Bold.ttf';
import Logo from '@/assets/img/logo.png'
import { CartItem } from '@/hooks/use-cart';
// Create styles

Font.register({
    family: 'Outfit',
    fonts: [
        {
            src: OutfitRegular,
            fontWeight: 400,
            fontStyle: 'normal'
        },
        {
            src: OutfitMedium,
            fontWeight: 500,
            fontStyle: 'normal'
        },
        {
            src: OutfitSemiBold,
            fontWeight: 600,
            fontStyle: 'normal'
        },
        {
            src: OutfitBold,
            fontWeight: 700,
        }
    ]
});


const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Outfit',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#23a1ab',
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    logo: {
        width: 100,
        height: 'auto',
    },
    headerText: {
        fontFamily: 'Outfit',
        fontWeight: 400,
        fontSize: 10,
        color: '#475569',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#23a1ab',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 10,
        color: '#23a1ab',
    },
    clientInfo: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f1f5fd',
        borderRadius: 5,
    },
    clientInfoRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    clientInfoLabel: {
        width: 120,
        fontWeight: 'bold',
        fontSize: 10,
        color: '#475569',
    },
    clientInfoText: {
        fontSize: 10,
        flex: 1,
    },
    table: {
        width: '100%',
        marginBottom: 20,
        borderStyle: 'solid',
        borderColor: '#effcfc',
        borderWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#effcfc',
        borderBottomWidth: 1,
    },
    tableColHeader: {
        backgroundColor: '#effcfc',
        padding: 5,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#23a1ab',
    },
    tableCol: {
        padding: 5,
        fontSize: 10,
    },
    productId: {
        width: '20%',
    },
    productName: {
        width: '30%',
    },
    productQty: {
        width: '10%',
        textAlign: 'center',
    },
    productPrice: {
        width: '20%',
        textAlign: 'right',
    },
    productTotal: {
        width: '20%',
        textAlign: 'right',
    },
    totals: {
        marginTop: 10,
        marginLeft: 'auto',
        width: '40%',
    },
    totalRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    totalLabel: {
        width: '50%',
        textAlign: 'right',
        fontSize: 10,
        fontWeight: 'bold',
        color: '#23a1ab',
        paddingRight: 5,
    },
    totalValue: {
        width: '50%',
        textAlign: 'right',
        fontSize: 10,
        color: '#23a1ab',
    },
    grandTotal: {
        backgroundColor: '#effcfc',
        fontWeight: 'bold',
        padding: 5,
    },
    footer: {
        marginTop: 'auto',
        borderTopWidth: 1,
        borderTopColor: '#bfdbfe',
        paddingTop: 10,
        fontSize: 8,
        color: '#64748b',
        textAlign: 'center',
    },
    terms: {
        marginTop: 20,
        fontSize: 9,
        color: '#64748b',
    },
    signature: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signatureLine: {
        width: '40%',
        borderTopWidth: 1,
        borderTopColor: '#94a3b8',
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 9,
        color: '#475569',
    },
});

// Formato de números
const formatCurrency = (value: number) => {
    return ` $${value.toFixed(2)}`; 
};
export function QuoterPDF({ products = [], total }: { products: CartItem[] , total: number }) {

    // Datos de ejemplo - en una aplicación real, estos vendrían de tus props o un API
    const quotationData = {
        quotationNumber: 'COT-2025-0531',
        date: '03/05/2025',
        expirationDate: '10/05/2025',
        clientInfo: {
            name: 'Juan Pérez Rodríguez',
            document: 'DNI: 12345678',
            address: 'Av. Principal 123, Lima',
            phone: '(+51) 987 654 321',
            email: 'juan.perez@email.com',
        },
        pharmacyInfo: {
            name: 'Farmacias Emerita',
            address: 'Calle 20 #91-E x 13 y 15. Colonia Chuburná de Hidalgo,Mérida, Yucatán, México, 97205',
            phone: ' (999) 924-0964',
            email: 'comentarios@emeritafarmacias.com',
            website: 'www.emeritafarmacias.com',
        }
    };


    return (<Document>
        <Page size="A4" style={styles.page}>
            {/* Encabezado */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.headerText, { fontSize: 14, marginBottom: 5, fontWeight: 700, color: '#23a1ab' }]}>{quotationData.pharmacyInfo.name}</Text>
                    <Text style={styles.headerText}>{quotationData.pharmacyInfo.address}</Text>
                    <Text style={styles.headerText}>{quotationData.pharmacyInfo.phone}</Text>
                    <Text style={styles.headerText}>{quotationData.pharmacyInfo.email}</Text>
                </View>

                {/* Aquí iría tu logo */}
                <View>
                    <Image style={styles.logo} src={Logo} />
                    {/* Si no tienes un logo, puedes usar un texto en su lugar */}

                </View>
            </View>

            {/* Detalle de productos */}
            <Text style={{ ...styles.subtitle, color: '#23a1ab' }}>Detalles de productos</Text>
            <View style={styles.table}>
                {/* Encabezados de tabla */}
                <View style={[styles.tableRow, { backgroundColor: '#dbeafe' }]}>
                    <Text style={[styles.tableColHeader, styles.productId]}>SKU</Text>
                    <Text style={[styles.tableColHeader, styles.productName]}>Producto</Text>
                    <Text style={[styles.tableColHeader, styles.productQty]}>Cant.</Text>
                    <Text style={[styles.tableColHeader, styles.productPrice]}>Precio Unit.</Text>
                    <Text style={[styles.tableColHeader, styles.productTotal]}>Subtotal</Text>
                </View>

                {/* Filas de productos */}
                {products?.map((item) => (
                    <View style={styles.tableRow} key={item.id}>
                        <Text style={[styles.tableCol, styles.productId]}>{item.sku}</Text>
                        <Text style={[styles.tableCol, styles.productName]}>{item.name}</Text>
                        <Text style={[styles.tableCol, styles.productQty]}>{item.quantity}</Text>
                        <Text style={[styles.tableCol, styles.productPrice]}>${item.price}</Text>
                        <Text style={[styles.tableCol, styles.productTotal]}>${(item.quantity * item.price).toFixed(2)}</Text>
                    </View>
                ))}
            </View>

            {/* Totales */}
            <View style={styles.totals}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Subtotal:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                </View>
                <View style={[styles.totalRow, styles.grandTotal]}>
                    <Text style={styles.totalLabel}>TOTAL:</Text>
                    <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
                </View>
            </View>



            <View style={styles.footer}>
                <Text>
                    {quotationData.pharmacyInfo.name} | {quotationData.pharmacyInfo.address} | {quotationData.pharmacyInfo.phone} | {quotationData.pharmacyInfo.website}
                </Text>
                <Text style={{ marginTop: 5 }}>
                    ¡Gracias por su preferencia! Su salud es nuestra prioridad.
                </Text>
            </View>
        </Page>
    </Document>
    );

}


