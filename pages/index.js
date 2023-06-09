import Pagina from "@/components/Pagina";
import React from "react";
import { Carousel } from "react-bootstrap";

import styles from "../styles/index.module.css";
import Rodape from "@/components/Rodape";
import Link from "next/link";

const Index = () => {
  return (
    <>
      <div className={styles.cover}>
        <Pagina>
          <Carousel>
            <Carousel.Item interval={2000}>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src="https://concursosdeprojeto.files.wordpress.com/2013/01/cc3a2mara-legislativa-do-df_imagem-07.jpg"
                alt="First slide"
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <Link href="/info">
                  <h3 className={styles.carouselTitle}>
                    Informações Institucionais
                  </h3>
                  <p className={styles.carouselDescription}>
                    Informações gerais sobre a Câmara Legislativa, como sua
                    missão, estrutura organizacional, comitês existentes,
                    eventos futuros, entre outros..
                  </p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img
                className={`d-block w-100 ${styles.carouselImage}`}
                src="https://www.ceap.br/wp-content/uploads/2019/05/NOT%C3%8DCIAS-banner.png"
                alt="Third slide"
              />
              <Carousel.Caption className={styles.carouselCaption}>
                <Link href="noticias">
                  <h3 className={styles.carouselTitle}>
                    Notícias e Atualizações
                  </h3>
                  <p className={styles.carouselDescription}>
                    Votações importantes, debates em destaque ou mudanças nas
                    leis.
                  </p>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Pagina>
        <Rodape />
      </div>
    </>
  );
};

export default Index;
