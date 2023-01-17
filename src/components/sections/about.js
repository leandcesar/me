import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--purple);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--purple);

    &:hover,
    &:focus {
      outline: 0;

      &:after {
        top: 15px;
        left: 15px;
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--purple);
      top: 20px;
      left: 20px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = [
    'Python 3',
    'Flask / FastAPI',
    'SQLAlchemy',
    'MySQL',
    'Docker',
    'AWS (ECS, RDS, Lambdas)',
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">Um pouco sobre mim</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Sou desenvolvedor, apaixonado por tecnologia e automatização. Iniciei minha jornada na
              área da robótica em 2016, graças a minha graduação em Engenharia de Controle e
              Automação. Desde então, percorri um vasto caminho ao longo de diversas linguagens e
              tecnologias, como{' '}
              <a href="https://en.wikipedia.org/wiki/C_(programming_language)">C</a>,{' '}
              <a href="https://en.wikipedia.org/wiki/C%2B%2B">C++</a>,{' '}
              <a href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)">C#</a>,{' '}
              <a href="https://en.wikipedia.org/wiki/Java_(programming_language)">Java</a> e{' '}
              <a href="https://en.wikipedia.org/wiki/MATLAB">Matlab</a>.
            </p>
            <p>
              Até que em 2018, encontrei o <a href="https://www.python.org/">Python</a> e venho me
              aprofundando nas suas aplicações, bibliotecas e frameworks. Tenho trabalhado
              diretamente com com bancos de dados relacionais (
              <a href="https://www.mysql.com/">MySQL</a>,{' '}
              <a href="https://www.postgresql.org/">PostgreSQL</a>),{' '}
              <a href="https://redis.io/">Redis</a>, <a href="https://www.docker.com/">Docker</a>,{' '}
              <a href="https://en.wikipedia.org/wiki/CI/CD">CI/CD</a>, e serviços da{' '}
              <a href="https://aws.amazon.com/">AWS</a> (
              <a href="https://aws.amazon.com/ecs/">ECS</a>,{' '}
              <a href="https://aws.amazon.com/rds/">RDS</a>,{' '}
              <a href="https://aws.amazon.com/lambda/">Lambdas</a>). Também desenvolvo{' '}
              <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">APIs REST</a>{' '}
              com <a href="https://flask.palletsprojects.com/en/2.1.x/">Flask</a> e{' '}
              <a href="https://fastapi.tiangolo.com/">FastAPI</a>.
            </p>
            <p>
              Estou sempre buscando novos desafios e soluções inovadoras! Estou ansioso para aplicar
              minhas habilidades e conhecimentos em projetos desafiadores e interessantes na área da
              tecnologia.
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
