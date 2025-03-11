import { Box, Grid, GridItem, ListItem, OrderedList, Text } from "@chakra-ui/react";
import Header from "../components/Header";

const AboutPage = () => {
    return (
        <Grid
        templateAreas={`"header header"
                        "main main"
                        "footer footer"`}
        gridTemplateRows={'50px 1fr 30px'}
        gridTemplateColumns={'150px 1fr'}
        h='100vh'
        gap='1'
        fontWeight='bold' 
      >
        <Header />
        <GridItem p='2' area={'main'}>
        <Text fontSize='2xl' fontWeight='bold' textAlign='center'>Tentang Kami - Skytrend</Text> 
        <Text  fontSize='lg' textAlign='justify' m={'3'} pt={'10'}>Skytrend adalah proyek website yang dirancang oleh mahasiswa Universitas Widya Dharma Pontianak untuk menyediakan informasi cuaca terkini di Indonesia. Dalam era digital ini, akses mudah dan cepat terhadap data cuaca sangat penting bagi masyarakat, baik untuk keperluan pribadi maupun bisnis. Proyek ini bertujuan untuk membantu pengguna memahami kondisi cuaca di daerah mereka, sehingga dapat merencanakan aktivitas dengan lebih baik.
        </Text>
        <Text fontSize='lg' textAlign='start' m={'3'} pt={'10'}>Melalui Skytrend, kami bertujuan untuk:</Text>

    <Box m={5} textAlign={'justify'}>
        <OrderedList m={'3'}>
        <ListItem p={2}>Meningkatkan kesadaran masyarakat tentang pentingnya informasi cuaca.</ListItem>
        <ListItem p={2}>Menyediakan platform yang mudah digunakan dan diakses oleh semua kalangan.</ListItem>
        <ListItem p={2}>Mendorong kolaborasi dan berbagi informasi antara pengguna.</ListItem>
    </OrderedList>
    </Box>

    <Text fontSize='lg' textAlign='justify' m={'3'}>Kami berharap proyek Skytrend dapat menjadi solusi yang bermanfaat bagi masyarakat Indonesia dalam memahami dan merespons kondisi cuaca di sekitar mereka. Terima kasih telah mengunjungi Skytrend!</Text>

       
        </GridItem>
        {/* <GridItem pl='2' bg='blue.300' area={'footer'}>
          Footer
        </GridItem> */}
      </Grid>
    );
}

export default AboutPage