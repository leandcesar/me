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

  const skills = ['Python 3', 'SQL', 'RabbitMQ', 'Docker & Compose', 'AWS Lambda', 'AWS ECS'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">Um pouco sobre mim</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Minha paixão é simplificar e automatizar coisas com programação. Meu interesse começou
              em 2015, quando descobri o mundo da robótica e decidi que seria a área que cursaria
              minha graduação.
            </p>

            <p>
              Conheci e me especializei em{' '}
              <a href="https://docs.microsoft.com/pt-br/cpp/c-language">C</a> e{' '}
              <a href="https://docs.microsoft.com/pt-br/cpp/cpp">C++</a> para micro-controladores,{' '}
              <a href="https://docs.microsoft.com/pt-br/dotnet/csharp/">C#</a> e{' '}
              <a href="https://www.java.com/pt-BR/">Java</a> para interfaces gráficas integradas com
              banco de dados, <a href="https://www.mathworks.com/products/matlab">Matlab</a> para
              análise e processamento de dados), e muito mais. Também participei de muitos projetos
              acadêmicos e eventos tecnológicos (Campus Party e Hackathons)
            </p>

            <p>
              Em 2018, tive contato com <a href="https://www.python.org/">Python</a>, que se tornou
              meu foco principal desde então e ampliou meu campo de aplicações e estudos, como
              Chatbots, APIs REST, Cloud (<a href="https://aws.amazon.com/">AWS</a> e{' '}
              <a href="https://www.heroku.com/">Heroku</a>, principalmente),{' '}
              <a href="https://www.docker.com/">Docker</a>, testes, design patterns e muito mais.
            </p>

            <p>Aqui estão algumas tecnologias com as quais tenho trabalhado recentemente:</p>
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
