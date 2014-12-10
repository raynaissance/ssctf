
// #pragma once
#include "ssctf.h"

#include "Kismet/BlueprintFunctionLibrary.h"
#include "SuperNetwork.generated.h"


/**
 *
 */
UCLASS()
class SSCTF_API USuperNetwork : public UBlueprintFunctionLibrary
{
	GENERATED_UCLASS_BODY()

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void Connect();

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void Register(FString map, FString port);

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void Login(FString  email, FString password);

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void Logout();

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void UnRegister();

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void UpdateConnectedPlayers(FString connectedPlayers);

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void List();

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void dispatch(AGameMode* gameMode, APlayerController* controller);

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void Analytics(FString email, FString  frozenByOpponentCount, FString  freezeOpponentCount, FString freezeShootCount, FString  superSpeedCount, FString unfreezeTeammateCount);
};
