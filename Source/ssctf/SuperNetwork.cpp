

#include "ssctf.h"
#include "SuperNetwork.h"
#include "easywsclient.hpp"

USuperNetwork::USuperNetwork(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{

}


//Happy Message
FString USuperNetwork::GetHappyMessage()
{
	return FString("Victory! Victory BP Library Works!");
}





//Register
void USuperNetwork::Register()
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("This is an on screen message!"));




}