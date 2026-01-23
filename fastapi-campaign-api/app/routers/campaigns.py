from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.database import get_session
from app.models import Campaign, CampaignCreate, CampaignUpdate

router = APIRouter(prefix="/campaigns", tags=["campaigns"])

@router.post("/", response_model=Campaign, status_code=status.HTTP_201_CREATED)
async def create_campaign(campaign: CampaignCreate, session: Session = Depends(get_session)):
    """
    Create a new campaign.
    """
    db_campaign = Campaign.model_validate(campaign)
    session.add(db_campaign)
    session.commit()
    session.refresh(db_campaign)
    return db_campaign

@router.get("/", response_model=List[Campaign])
async def read_campaigns(session: Session = Depends(get_session)):
    """
    Read all campaigns.
    """
    campaigns = session.exec(select(Campaign)).all()
    return campaigns

@router.get("/{campaign_id}", response_model=Campaign)
async def read_campaign(campaign_id: int, session: Session = Depends(get_session)):
    """
    Read a single campaign by ID.
    """
    campaign = session.get(Campaign, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

@router.put("/{campaign_id}", response_model=Campaign)
async def update_campaign(campaign_id: int, campaign_update: CampaignUpdate, session: Session = Depends(get_session)):
    """
    Update a campaign.
    """
    db_campaign = session.get(Campaign, campaign_id)
    if not db_campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    # exclude_unset=True ensures we only update the fields that were actually sent
    campaign_data = campaign_update.model_dump(exclude_unset=True)
    db_campaign.sqlmodel_update(campaign_data)
    
    session.add(db_campaign)
    session.commit()
    session.refresh(db_campaign)
    return db_campaign

@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_campaign(campaign_id: int, session: Session = Depends(get_session)):
    """
    Delete a campaign.
    """
    campaign = session.get(Campaign, campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    
    session.delete(campaign)
    session.commit()
