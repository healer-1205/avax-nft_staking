import React from 'react';
import { Modal,Row,Col} from 'react-bootstrap';
import { Slide, Zoom } from "react-awesome-reveal";
import nftAttributes from '../redux/nftAttributes';
import rarity from '../redux/rarity';

function MyVerticallyCenteredModal(props) {
    let attributes = {};

    props.woa.attributes && props.woa.attributes.forEach(d => {
      attributes[d.trait_type] = d.value;
    });

    const rarityColor = (type, value) => {
      const r = rarity[nftAttributes[type][value]];

      if (r === "Iconic") {
        return "violet";
      } else if (r === "Legendary") {
        return "gold";
      } else if (r === "Epic") {
        return "red";
      } else if (r === "Rare") {
        return "blue";
      } else if (r === "Common") {
        return "green";
      }
    }

    const NFTRarity = () => {
      let nftRarityTotal = 0;

      props.woa.attributes && props.woa.attributes.forEach(d => {
        const r = rarity[nftAttributes[d.trait_type][attributes[d.trait_type]]];

        if (r === "Iconic") {
          nftRarityTotal = nftRarityTotal + 5;
        } else if (r === "Legendary") {
          nftRarityTotal = nftRarityTotal + 4;
        } else if (r === "Epic") {
          nftRarityTotal = nftRarityTotal + 3;
        } else if (r === "Rare") {
          nftRarityTotal = nftRarityTotal + 2;
        } else if (r === "Common") {
          nftRarityTotal = nftRarityTotal + 1;
        }
      });

      // iconic -> 42 - 45
      // legendary -> 33 - 41
      // epic -> 24 - 32
      // rare -> 15 - 23
      // common -> 1 - 14
      
      if (nftRarityTotal <= 14) {
        return <h4 style={{ color: 'green', paddingTop: 20 }}>Common Wolf</h4>;
      } else if (nftRarityTotal <= 23) {
        return <h4 style={{ color: 'blue', paddingTop: 20 }}>Rare Wolf</h4>;
      } else if (nftRarityTotal <= 32) {
        return <b style={{ color: 'red', paddingTop: 20 }}>Epic Wolf</b>;
      } else if (nftRarityTotal <= 41) {
        return <b style={{ color: 'gold', paddingTop: 20 }}>Legendary Wolf</b>;
      } else if (nftRarityTotal <= 45) {
        return <b style={{ color: 'violet', paddingTop: 20 }}>Iconic Wolf</b>;
      }

      return <b>Common</b>;
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='body-modal'
      >
        <Modal.Body  style={{padding:"0px"}}>
          <Row>
            <Col sm={6}>
              <Slide direction='left' duration={600}>
                <img width="100%" src={ props.woa.image && 'https://ipfs.io/ipfs/' + (props.woa.image).replace("ipfs://", "") } alt='' />
              </Slide> 
            </Col>
            <Col sm={6}>
              <Slide direction='right' duration={600}>
                <h1 className='modal-name-code'>{ props.woa.name }</h1>
                <Row>
                  <Col sm={12} className="pt-1">
                  <NFTRarity />
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Background: </label> (<b style={{ color: rarityColor('background', attributes.background) }}>{ rarity[nftAttributes['background'][attributes.background]] }</b>) { attributes.background }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                     <div><label>Wing: </label> (<b style={{ color: rarityColor('wing', attributes.wing) }}>{ rarity[nftAttributes['wing'][attributes.wing]] }</b>) { attributes.wing }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Base: </label> (<b style={{ color: rarityColor('base', attributes.base) }}>{ rarity[nftAttributes['base'][attributes.base]] }</b>) { attributes.base }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Body: </label> (<b style={{ color: rarityColor('body', attributes.body) }}>{ rarity[nftAttributes['body'][attributes.body]] }</b>) { attributes.body }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Accessory: </label> (<b style={{ color: rarityColor('accessory', attributes.accessory) }}>{ rarity[nftAttributes['accessory'][attributes.accessory]] }</b>) { attributes.accessory }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Eyes: </label> (<b style={{ color: rarityColor('eyes', attributes.eyes) }}>{ rarity[nftAttributes['eyes'][attributes.eyes]] }</b>) { attributes.eyes }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Head: </label> (<b style={{ color: rarityColor('head', attributes.head) }}>{ rarity[nftAttributes['head'][attributes.head]] }</b>) { attributes.head }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Earring: </label> (<b style={{ color: rarityColor('earring', attributes.earring) }}>{ rarity[nftAttributes['earring'][attributes.earring]] }</b>) { attributes.earring }</div>
                  </Col>
                  <Col sm={12} className="pt-1">
                    <div><label>Hand: </label> (<b style={{ color: rarityColor('hand', attributes.hand) }}>{ rarity[nftAttributes['hand'][attributes.hand]] }</b>) { attributes.hand }</div>
                  </Col>
                </Row>
              </Slide>
            </Col>
          </Row>  
        </Modal.Body>
      </Modal>
    );
  }

  export default MyVerticallyCenteredModal;