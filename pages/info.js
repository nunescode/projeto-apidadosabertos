import Pagina from "@/components/Pagina";
import React from "react";
import styles from "../styles/info.module.css";

const info = () => {
  return (
    <Pagina>
      <div className={styles.container}>
        <h1 className={styles.infotitle}>Informações Institucionais</h1>
        <p className={styles.infosubtitle}>
          A Câmara Legislativa é responsável pela elaboração e aprovação de leis
          que regem o Distrito Federal. Aqui estão algumas informações gerais
          sobre a instituição:
        </p>
        
        <h2 className={styles.infotitle}>História da Câmara Legislativa</h2>
        <p className={styles.infosubtitle}>
          A Câmara Legislativa tem uma história rica e importante no contexto
          político do Distrito Federal. Desde a sua criação, em 1991, ela tem
          desempenhado um papel fundamental na representação dos interesses da
          população e na formulação de políticas públicas que impactam a vida
          dos cidadãos.
        </p>

        <h2 className={styles.infotitle}>Funcionamento do Legislativo</h2>
        <p className={styles.infosubtitle}>
          O processo legislativo na Câmara Legislativa envolve várias etapas,
          desde a apresentação de projetos de lei até a sua aprovação final. Os
          deputados desempenham um papel fundamental nesse processo, discutindo,
          debatendo e votando as propostas que afetam diretamente a população do
          Distrito Federal.
        </p>

        <h2 className={styles.infotitle}>Papel dos Deputados</h2>
        <p className={styles.infosubtitle}>
          Os deputados da Câmara Legislativa têm a responsabilidade de
          representar os interesses dos cidadãos, fiscalizar as ações do Poder
          Executivo e propor leis que visem ao bem-estar da população. Eles
          participam ativamente dos debates, das comissões temáticas e das
          decisões que moldam o futuro do Distrito Federal.
        </p>

        <h2 className={styles.infotitle}>
          Transparência e Participação Cidadã
        </h2>

        <p className={styles.infosubtitle}>
          A Câmara Legislativa valoriza a transparência e busca promover a
          participação cidadã. Através de mecanismos como audiências públicas e
          canais de comunicação direta, busca-se garantir decisões transparentes
          e representativas. Portais de transparência permitem acesso a
          informações sobre atividades parlamentares, enquanto comissões e
          fóruns de discussão envolvem a sociedade civil. Transparência e
          participação fortalecem a democracia e garantem decisões alinhadas aos
          interesses da população.
        </p>

        <h2 className={styles.infotitle}>Missão</h2>
        <p className={styles.infosubtitle}>
          A missão da Câmara Legislativa é representar os interesses da
          população, promover a transparência e a participação cidadã, e
          fiscalizar as ações do Poder Executivo.
        </p>

        <h2 className={styles.infotitle}>Estrutura Organizacional</h2>
        <p className={styles.infosubtitle}>
          A Câmara Legislativa possui uma estrutura organizacional composta por
          diferentes setores e órgãos, incluindo o Plenário, as Comissões
          Temáticas, a Mesa Diretora e a Secretaria-Geral.
        </p>

        <h2 className={styles.infotitle}>Comitês Existentes</h2>
        <p className={styles.infosubtitle}>
          Existem diversos comitês e grupos de trabalho na Câmara Legislativa,
          cada um com sua área de atuação específica. Alguns exemplos são o
          Comitê de Educação, o Comitê de Saúde e o Comitê de Finanças.
        </p>

        <h2 className={styles.infotitle}>Eventos Futuros</h2>
        <p className={styles.infosubtitle}>
          A Câmara Legislativa organiza e participa de diferentes eventos ao
          longo do ano, como audiências públicas, debates, seminários e sessões
          especiais. Fique atento à agenda para saber mais sobre os eventos
          futuros.
        </p>
      </div>
    </Pagina>
  );
};

export default info;
