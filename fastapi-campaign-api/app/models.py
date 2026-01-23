from datetime import datetime, timezone
from typing import Optional
from sqlmodel import Field, SQLModel

# Base Model (Common fields)
class CampaignBase(SQLModel):
    name: str
    due_date: Optional[datetime] = None

# Table Model (Database schema)
class Campaign(CampaignBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Create Model (Input validation for creating)
class CampaignCreate(CampaignBase):
    pass

# Update Model (Input validation for updating - all optional)
class CampaignUpdate(SQLModel):
    name: Optional[str] = None
    due_date: Optional[datetime] = None

# Response Model (If we wanted to hide fields, but here we return Campaign)
# We can use Generic Response wrapper as mentioned in the video too, but let's keep it simple first
# or follow the video's "Step 15: Proper response types" if desired.
