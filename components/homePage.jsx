'use client'

import Image from 'next/image';
import logo from "@/public/logo.png"
import { FaCircle } from "react-icons/fa";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const perguntas = [
    {
        pergunta: "O que é considerado uma gravidez precoce, e quais são os impactos econômicos e sociais disso?",
        resposta: "Gravidez precoce é considerada quando ocorre na adolescência, geralmente entre 10 e 19 anos. Os impactos econômicos incluem o aumento do custo de vida devido à compra de fraldas, alimentos e cuidados médicos. Socialmente, pode levar à interrupção dos estudos, dificuldade de inserção no mercado de trabalho e rejeição familiar, além de afetar o desenvolvimento psicológico da jovem mãe.",
    },
    {
        pergunta: "Quantos jovens contraem infecções sexualmente transmissíveis (ISTs) ou doenças sexualmente transmissíveis (DSTs) por ano, e quais são as mais comuns?",
        resposta: "Estima-se que milhões de jovens em todo o mundo contraem ISTs anualmente. No Brasil, dados do Ministério da Saúde indicam um aumento nas taxas de sífilis, gonorreia e HIV entre adolescentes e jovens adultos. As mais comuns incluem HIV, sífilis, clamídia, gonorreia e HPV.",
    },
    {
        pergunta: "Qual é o custo médio de criar um bebê no primeiro ano de vida, e como isso pode impactar financeiramente a vida de um jovem?",
        resposta: "O custo médio de criar um bebê no primeiro ano de vida pode variar bastante, mas pode alcançar cifras entre R$ 12.000 a R$ 15.000, dependendo da localidade e das condições da família. Esse valor inclui despesas com fraldas, leite, roupas, cuidados médicos e equipamentos básicos para o bebê. Para jovens, esse custo pode gerar uma pressão financeira significativa, dificultando o retorno aos estudos ou ao mercado de trabalho.",
    },
    {
        pergunta: "Como lidar com a rejeição da família e dos amigos ao descobrir uma gravidez ou uma IST?",
        resposta: "É importante buscar apoio emocional, seja através de amigos, grupos de apoio ou até mesmo terapia. A comunicação aberta e honesta pode ajudar a lidar com as tensões familiares. Caso haja dificuldades, procurar apoio em instituições e serviços sociais pode ser crucial para assegurar o bem-estar psicológico.",
    },
    {
        pergunta: "Quais são os métodos contraceptivos mais eficazes para prevenir a gravidez, e como cada um deles funciona?",
        resposta: "Os métodos contraceptivos mais eficazes incluem o DIU (dispositivo intrauterino), anticoncepcionais hormonais (pílula, injeção, adesivo), preservativo masculino e feminino, além da vasectomia e laqueadura, que são permanentes. Cada um funciona de maneira distinta, seja bloqueando o encontro entre espermatozoide e óvulo (preservativos e DIU) ou suprimindo a ovulação (hormonais).",
    },
    {
        pergunta: "Existe algum método contraceptivo que seja 100% eficaz? Quais são os prós e contras dos principais métodos?",
        resposta: "Não existe método contraceptivo que seja 100% eficaz, mas a combinação de preservativo com outro método (como pílula ou DIU) oferece uma grande proteção. Cada método tem prós e contras: preservativos protegem contra ISTs, mas podem romper; pílulas e DIU oferecem alta eficácia, mas podem ter efeitos colaterais.",
    },
    {
        pergunta: "Quais são os sinais e sintomas mais comuns das doenças venéreas, como HIV, gonorreia, clamídia e sífilis?",
        resposta: "HIV pode inicialmente causar sintomas semelhantes a gripe; gonorreia e clamídia muitas vezes causam dor ao urinar e secreção anormal; a sífilis pode causar feridas indolores nos estágios iniciais. Se não tratadas, essas infecções podem causar complicações sérias, como infertilidade e danos sistêmicos.",
    },
    {
        pergunta: "Quais são os principais riscos de não tratar infecções como o HPV, herpes genital e hepatite B?",
        resposta: "O HPV pode levar ao desenvolvimento de câncer, especialmente de colo do útero. A herpes genital pode causar recorrência de lesões e complicações na gravidez, e a hepatite B pode levar a complicações hepáticas graves, como cirrose e câncer de fígado, se não tratada adequadamente.",
    },
    {
        pergunta: "O que devo fazer se eu suspeitar que contraí uma IST? Quais são os recursos e serviços disponíveis para buscar ajuda confidencialmente?",
        resposta: "Se você suspeitar que contraiu uma IST, deve procurar um médico imediatamente para diagnóstico e tratamento. Serviços de saúde públicos e privados oferecem consultas confidenciais. No Brasil, os postos de saúde e clínicas especializadas, como o SUS, oferecem testes e tratamentos com total sigilo.",
    },
    {
        pergunta: "Como posso me informar adequadamente sobre saúde sexual, evitando desinformações ou mitos sobre contraceptivos e doenças venéreas?",
        resposta: "É importante buscar fontes confiáveis, como médicos, ginecologistas, urologistas, e instituições de saúde como o Ministério da Saúde ou a Organização Mundial da Saúde. Também é útil utilizar materiais educativos distribuídos por escolas e clínicas e participar de palestras e campanhas informativas.",
    },
    {
        pergunta: "Por que é importante falar sobre educação sexual na adolescência?",
        resposta: "Educação sexual é fundamental para preparar os jovens para tomarem decisões informadas sobre seus corpos, relacionamentos e saúde. Ela ajuda a prevenir gravidez precoce, ISTs, e a promover o respeito mútuo e a autoaceitação.",
    },
    {
        pergunta: "O que é consentimento e por que ele é essencial nas relações sexuais?",
        resposta: "Consentimento é um acordo claro e consciente entre as partes envolvidas em qualquer atividade sexual. Ele deve ser dado de forma livre, sem coerção, e pode ser retirado a qualquer momento. É essencial para garantir que as relações sejam respeitosas e seguras.",
    },
    {
        pergunta: "A masturbação é normal? Quais são seus benefícios e mitos?",
        resposta: "Sim, a masturbação é uma prática normal e saudável. Entre seus benefícios estão o autoconhecimento do corpo, a liberação de tensão e a diminuição de estresse. Mitos como a ideia de que ela causa problemas físicos ou emocionais são infundados.",
    },
    {
        pergunta: "Quais são os tipos de relacionamentos saudáveis e o que caracteriza um relacionamento abusivo?",
        resposta: "Relacionamentos saudáveis são baseados em respeito, confiança, comunicação aberta e igualdade. Relacionamentos abusivos envolvem controle, manipulação, violência emocional ou física, e falta de respeito pelos limites do outro.",
    },
    {
        pergunta: "Qual a importância de se vacinar contra o HPV?",
        resposta: "A vacina contra o HPV é importante porque protege contra o vírus que pode causar verrugas genitais e está associado a diversos tipos de câncer, como o de colo do útero e garganta. A vacinação é mais eficaz antes do início da vida sexual.",
    },
    {
        pergunta: "Quais são as diferenças entre sexo biológico, identidade de gênero e orientação sexual?",
        resposta: "Sexo biológico refere-se às características físicas e genéticas; identidade de gênero é como uma pessoa se identifica internamente (homem, mulher, não binário); e orientação sexual diz respeito a quem uma pessoa sente atração (heterossexual, homossexual, bissexual, etc.).",
    },
    {
        pergunta: "Existe uma idade certa para iniciar a vida sexual?",
        resposta: "Não há uma idade certa, mas é importante que o início da vida sexual seja uma escolha informada e consensual. A maturidade emocional, o entendimento das responsabilidades e riscos, e o uso de métodos contraceptivos são essenciais.",
    },
    {
        pergunta: "Como a pornografia pode influenciar negativamente as expectativas sobre o sexo?",
        resposta: "A pornografia muitas vezes retrata práticas irreais, desconsiderando o consentimento, o prazer mútuo e a comunicação."
    }
]

const HomePage = ({ }) => {
    return (
        <main className='flex flex-col gap-4 px-4 bg-slate-100 text-cinza'>
            <header className='flex flex-col gap-1 items-center'>
                <Image src={logo} alt='logo unima' height={50} priority className='self-start' />
                <h1 className='text-3xl font-semibold'>Saberes do Corpo</h1>
            </header>
            <section className='flex flex-col items-center relative text-rosa'>
                <h2 className='text-2xl font-medium self-start text-cinza z-10'>Links Confiáveis</h2>
                <FaCircle className='absolute -left-1 top-1 text-2xl text-rosa z-0  opacity-70' />
                <h3 className='text-sm text-gray-500 self-start'>Clique para acessar</h3>
                <Link href={"https://vidasaudavel.einstein.br/metodos-contraceptivos/"}>Metodos Contraceptivos</Link>
                <Link href={"https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/ist#:~:text=As%20Infec%C3%A7%C3%B5es%20Sexualmente%20Transmiss%C3%ADveis%20%2D%20IST,uma%20pessoa%20que%20esteja%20infectada."}>O que são ISTs</Link>
                <Link href={"https://www.tuasaude.com/doencas-sexualmente-transmissiveis-dst/"}>Principais ISTs</Link>
                <Link href={"https://brasilescola.uol.com.br/biologia/gravidez-adolescencia.htm#:~:text=As%20adolescentes%20gr%C3%A1vidas%20enfrentam%20maiores,pode%20limitar%20suas%20oportunidades%20futuras."}>Gravidez na Adolescência</Link>

            </section>
            <section className='relative flex flex-col gap-6'>
                <h2 className='text-2xl font-medium text-cinza z-10'>Perguntas Frequentes</h2>
                <FaCircle className='absolute -left-1 top-1 text-2xl text-rosa z-0  opacity-70' />
                {perguntas.map(({ pergunta, resposta }, key) => (
                    <div key={key}>
                        <h2 className="font-medium">{key + 1} - {pergunta}</h2>
                        <h2>{resposta}</h2>
                    </div>
                ))}
            </section>

        </main>
    );
};

export default HomePage;